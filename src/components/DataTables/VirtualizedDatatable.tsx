import {
  ColumnDef,
  ColumnFiltersState,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/solid-table";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { ChevronDown, ChevronUp } from "lucide-solid";
import { createMemo, createSignal, For, JSXElement, Show } from "solid-js";
import { css } from "../../../styled-system/css";

import { tableStyles } from "./styles";

interface VirtualizedDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  enableSorting?: boolean;
  searchPlaceholder?: string;
  height?: string;
  estimateSize?: () => number;
  overscan?: number;
}

function VirtualizedDataTable<T>(
  props: VirtualizedDataTableProps<T>,
): JSXElement {
  let parentRef: HTMLDivElement | undefined;

  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = createSignal("");

  const table = createMemo(() =>
    createSolidTable({
      get data() {
        return props.data;
      },
      get columns() {
        return props.columns;
      },
      state: {
        get sorting() {
          return props.enableSorting !== false ? sorting() : [];
        },
        get columnFilters() {
          return props.enableColumnFilters !== false ? columnFilters() : [];
        },
        get globalFilter() {
          return props.enableGlobalFilter !== false ? globalFilter() : "";
        },
      },
      onSortingChange: props.enableSorting !== false ? setSorting : () => {},
      onColumnFiltersChange:
        props.enableColumnFilters !== false ? setColumnFilters : () => {},
      onGlobalFilterChange:
        props.enableGlobalFilter !== false ? setGlobalFilter : () => {},
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel:
        props.enableSorting !== false ? getSortedRowModel() : getCoreRowModel(),
      getFilteredRowModel:
        props.enableGlobalFilter !== false ||
        props.enableColumnFilters !== false
          ? getFilteredRowModel()
          : getCoreRowModel(),
    }),
  );

  const filteredRows = createMemo(() => table().getRowModel().rows);

  const rowVirtualizer = createMemo(() =>
    createVirtualizer({
      get count() {
        return filteredRows().length;
      },
      getScrollElement: () => parentRef!,
      estimateSize: props.estimateSize || (() => 48),
      overscan: props.overscan || 5,
    }),
  );

  return (
    <div class={tableStyles.container}>
      {props.enableGlobalFilter !== false && (
        <div class={tableStyles.globalSearchContainer}>
          <input
            value={globalFilter()}
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder={props.searchPlaceholder || "Search all columns..."}
            class={tableStyles.globalSearchInput}
          />
        </div>
      )}

      <div
        style={{
          overflow: "scroll",
          "overflow-y": "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
          }}
        >
          <thead
            class={tableStyles.tableHead}
            style={{
              width: "100%",
            }}
          >
            <For each={table().getHeaderGroups()}>
              {(headerGroup) => (
                <tr
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <th
                        class={tableStyles.th}
                        style={{
                          width: header.column.columnDef.size
                            ? `${header.column.columnDef.size}px`
                            : "auto",
                          flex: header.column.columnDef.size ? "none" : "1",
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            style={{
                              display: "flex",
                              "flex-direction": "column",
                              // TODO Let's remove this and have the input automatically shrink to fit
                              // Probably need flex argument on the input
                              overflow: "hidden",
                            }}
                            class={tableStyles.headerContainer}
                          >
                            <button
                              class={tableStyles.sortButton}
                              onClick={header.column.getToggleSortingHandler()}
                              disabled={
                                !header.column.getCanSort() ||
                                props.enableSorting === false
                              }
                            >
                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </span>
                              {props.enableSorting !== false &&
                                header.column.getIsSorted() === "asc" && (
                                  <ChevronUp size={16} />
                                )}
                              {props.enableSorting !== false &&
                                header.column.getIsSorted() === "desc" && (
                                  <ChevronDown size={16} />
                                )}
                            </button>
                            <Show
                              when={
                                props.enableColumnFilters !== false &&
                                header.column.getCanFilter()
                              }
                            >
                              <input
                                style={{
                                  flex: "1",
                                }}
                                type="text"
                                value={
                                  (header.column.getFilterValue() as string) ||
                                  ""
                                }
                                onInput={(e) =>
                                  header.column.setFilterValue(
                                    e.currentTarget.value,
                                  )
                                }
                                placeholder="Filter..."
                                class={tableStyles.filterInput}
                              />
                            </Show>
                          </div>
                        )}
                      </th>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </thead>

          <tbody
            ref={parentRef}
            class={css({
              display: "block",
              overflow: "auto",
              bg: "white",
              position: "relative",
            })}
            style={{
              height: props.height || "400px",
            }}
          >
            <For each={rowVirtualizer().getVirtualItems()}>
              {(virtualItem) => {
                const row = filteredRows()[virtualItem.index];
                if (!row) return null;

                return (
                  <tr
                    class={css({
                      borderBottom: "1px solid token(colors.gray.100)",
                      _hover: { bg: "gray.50" },
                      // Striped rows - comment out the line below to remove striping
                      bg: virtualItem.index % 2 === 0 ? "white" : "gray.50/30",
                      // Alternative striping options:
                      // bg: virtualItem.index % 2 === 0 ? "white" : "gray.100/20", // Lighter stripes
                      // bg: virtualItem.index % 2 === 0 ? "white" : "blue.50/20", // Blue tinted stripes
                    })}
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <td
                          class={css({
                            px: 4,
                            py: 3,
                            fontSize: "sm",
                            color: "gray.900",
                            borderRight: "1px solid token(colors.gray.100)",
                            _last: { borderRight: "none" },
                            display: "flex",
                            alignItems: "center",
                          })}
                          style={{
                            width: cell.column.columnDef.size
                              ? `${cell.column.columnDef.size}px`
                              : "auto",
                            flex: cell.column.columnDef.size ? "none" : "1",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      )}
                    </For>
                  </tr>
                );
              }}
            </For>

            {/* Spacer for total height */}
            <tr
              style={{
                height: `${rowVirtualizer().getTotalSize()}px`,
                visibility: "hidden",
              }}
            >
              <td class={css({ display: "block" })} />
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class={css({
          px: 4,
          py: 3,
          borderTop: "1px solid token(colors.gray.200)",
          bg: "gray.50",
          fontSize: "sm",
          color: "gray.600",
          textAlign: "center",
          roundedBottom: "lg",
        })}
      >
        Showing {filteredRows().length} of {props.data.length} rows
      </div>
    </div>
  );
}

export default VirtualizedDataTable;

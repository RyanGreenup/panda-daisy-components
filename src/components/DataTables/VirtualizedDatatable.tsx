import { createSignal, createMemo, For, Component, JSXElement } from "solid-js";
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/solid-table";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { ChevronUp, ChevronDown } from "lucide-solid";
import { css } from "../../../styled-system/css";

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
    <div class={css({
      w: "full",
      bg: "white",
      rounded: "lg",
      border: "1px solid token(colors.gray.200)",
      shadow: "sm"
    })}>
      {props.enableGlobalFilter !== false && (
        <div class={css({
          p: 4,
          borderBottom: "1px solid token(colors.gray.200)"
        })}>
          <input
            value={globalFilter()}
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder={props.searchPlaceholder || "Search all columns..."}
            class={css({
              w: "full",
              px: 3,
              py: 2,
              border: "1px solid token(colors.gray.300)",
              rounded: "md",
              fontSize: "sm",
              _placeholder: { color: "gray.500" },
              _focus: {
                outline: "none",
                borderColor: "blue.500",
                ring: "2px",
                ringColor: "blue.500",
                ringOpacity: 0.2
              }
            })}
          />
        </div>
      )}

      <div class={css({ overflow: "hidden" })}>
        <table class={css({
          w: "full",
          borderCollapse: "separate",
          borderSpacing: 0
        })}>
          <thead class={css({
            bg: "gray.50",
            borderBottom: "2px solid token(colors.gray.200)",
            display: "block",
            width: "100%"
          })}>
            <For each={table().getHeaderGroups()}>
              {(headerGroup) => (
                <tr class={css({
                  display: "flex",
                  width: "100%"
                })}>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <th
                        class={css({
                          px: 4,
                          py: 3,
                          textAlign: "left",
                          fontSize: "sm",
                          fontWeight: "semibold",
                          color: "gray.900",
                          borderRight: "1px solid token(colors.gray.200)",
                          _last: { borderRight: "none" },
                          display: "flex",
                          alignItems: "center"
                        })}
                        style={{
                          width: header.column.columnDef.size
                            ? `${header.column.columnDef.size}px`
                            : "auto",
                          flex: header.column.columnDef.size ? "none" : "1"
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div class={css({ display: "flex", flexDirection: "column", gap: 2 })}>
                            <button
                              class={css({
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                bg: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "sm",
                                fontWeight: "semibold",
                                color: "gray.900",
                                _hover: { color: "gray.700" },
                                _disabled: { cursor: "not-allowed", color: "gray.400" }
                              })}
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
                            {props.enableColumnFilters !== false &&
                              header.column.getCanFilter() && (
                                <input
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
                                  class={css({
                                    px: 2,
                                    py: 1,
                                    border: "1px solid token(colors.gray.300)",
                                    rounded: "sm",
                                    fontSize: "xs",
                                    w: "full",
                                    maxW: "20",
                                    _placeholder: { color: "gray.400" },
                                    _focus: {
                                      outline: "none",
                                      borderColor: "blue.400",
                                      ring: "1px",
                                      ringColor: "blue.400"
                                    }
                                  })}
                                />
                              )}
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
              position: "relative"
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
                      _even: { bg: "gray.25" }
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
                            alignItems: "center"
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

      <div class={css({
        px: 4,
        py: 3,
        borderTop: "1px solid token(colors.gray.200)",
        bg: "gray.50",
        fontSize: "sm",
        color: "gray.600",
        textAlign: "center",
        roundedBottom: "lg"
      })}>
        Showing {filteredRows().length} of {props.data.length} rows
      </div>
    </div>
  );
}

export default VirtualizedDataTable;

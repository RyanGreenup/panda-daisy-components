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
    <div>
      {props.enableGlobalFilter !== false && (
        <div>
          <input
            value={globalFilter()}
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder={props.searchPlaceholder || "Search all columns..."}
          />
        </div>
      )}

      <div>
        <table>
          <thead>
            <For each={table().getHeaderGroups()}>
              {(headerGroup) => (
                <tr>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <th
                        style={{
                          width: header.column.columnDef.size
                            ? `${header.column.columnDef.size}px`
                            : "auto",
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            <button
                              onClick={header.column.getToggleSortingHandler()}
                              disabled={
                                !header.column.getCanSort() ||
                                props.enableSorting === false
                              }
                            >
                              <span style={{ "font-weight": "600" }}>
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
            style={{
              height: props.height || "400px",
              display: "block",
              overflow: "auto",
            }}
          >
            <For each={rowVirtualizer().getVirtualItems()}>
              {(virtualItem) => {
                const row = filteredRows()[virtualItem.index];
                if (!row) return null;

                return (
                  <tr
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
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        Showing {filteredRows().length} of {props.data.length} rows
      </div>
    </div>
  );
}

export default VirtualizedDataTable;

import { createSignal, createMemo, For, Component, JSXElement } from 'solid-js'
import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/solid-table'
import { createVirtualizer } from '@tanstack/solid-virtual'
import { ChevronUp, ChevronDown } from 'lucide-solid'
import { tableStyles, virtualTableStyles } from './styles'

interface VirtualizedDataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  enableGlobalFilter?: boolean
  enableColumnFilters?: boolean
  enableSorting?: boolean
  searchPlaceholder?: string
  height?: string
  estimateSize?: () => number
  overscan?: number
}

function VirtualizedDataTable<T>(props: VirtualizedDataTableProps<T>): JSXElement {
  let parentRef: HTMLDivElement | undefined

  const [sorting, setSorting] = createSignal<SortingState>([])
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = createSignal('')

  const table = createMemo(() =>
    createSolidTable({
      get data() {
        return props.data
      },
      get columns() {
        return props.columns
      },
      state: {
        get sorting() {
          return props.enableSorting !== false ? sorting() : []
        },
        get columnFilters() {
          return props.enableColumnFilters !== false ? columnFilters() : []
        },
        get globalFilter() {
          return props.enableGlobalFilter !== false ? globalFilter() : ''
        },
      },
      onSortingChange: props.enableSorting !== false ? setSorting : () => {},
      onColumnFiltersChange: props.enableColumnFilters !== false ? setColumnFilters : () => {},
      onGlobalFilterChange: props.enableGlobalFilter !== false ? setGlobalFilter : () => {},
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: props.enableSorting !== false ? getSortedRowModel() : getCoreRowModel(),
      getFilteredRowModel: (props.enableGlobalFilter !== false || props.enableColumnFilters !== false) ? getFilteredRowModel() : getCoreRowModel(),
    })
  )

  const filteredRows = createMemo(() => table().getRowModel().rows)

  const rowVirtualizer = createMemo(() =>
    createVirtualizer({
      get count() {
        return filteredRows().length
      },
      getScrollElement: () => parentRef!,
      estimateSize: props.estimateSize || (() => 48),
      overscan: props.overscan || 5,
    })
  )

  const styles = tableStyles()
  const virtualStyles = virtualTableStyles()

  return (
    <div class={styles.container}>
      {props.enableGlobalFilter !== false && (
        <div class={styles.searchContainer}>
          <input
            value={globalFilter()}
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            class={styles.searchInput}
            placeholder={props.searchPlaceholder || "Search all columns..."}
          />
        </div>
      )}

      <div class={styles.tableWrapper}>
        <table class={styles.table}>
          <thead class={styles.thead}>
            <For each={table().getHeaderGroups()}>
              {headerGroup => (
                <tr class={styles.headerRow}>
                  <For each={headerGroup.headers}>
                    {header => (
                      <th
                        class={styles.headerCell}
                        style={{
                          width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : 'auto'
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            <button
                              class={styles.sortButton}
                              onClick={header.column.getToggleSortingHandler()}
                              disabled={!header.column.getCanSort() || props.enableSorting === false}
                            >
                              <span style={{ "font-weight": "600" }}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </span>
                              {props.enableSorting !== false && header.column.getIsSorted() === 'asc' && (
                                <ChevronUp size={16} />
                              )}
                              {props.enableSorting !== false && header.column.getIsSorted() === 'desc' && (
                                <ChevronDown size={16} />
                              )}
                            </button>
                            {props.enableColumnFilters !== false && header.column.getCanFilter() && (
                              <input
                                type="text"
                                value={header.column.getFilterValue() as string || ''}
                                onInput={(e) => header.column.setFilterValue(e.currentTarget.value)}
                                placeholder="Filter..."
                                class={styles.filterInput}
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
            class={`${styles.tbody} ${virtualStyles.scrollContainer}`}
            style={{ 
              height: props.height || "400px",
              display: "block",
              overflow: "auto"
            }}
          >
            <For each={rowVirtualizer().getVirtualItems()}>
              {virtualItem => {
                const row = filteredRows()[virtualItem.index]
                if (!row) return null

                return (
                  <tr
                    class={`${styles.bodyRow} ${virtualStyles.virtualRow}`}
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      display: "flex"
                    }}
                  >
                    <For each={row.getVisibleCells()}>
                      {cell => (
                        <td
                          class={styles.bodyCell}
                          style={{
                            width: cell.column.columnDef.size ? `${cell.column.columnDef.size}px` : 'auto',
                            flex: cell.column.columnDef.size ? 'none' : '1'
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )}
                    </For>
                  </tr>
                )
              }}
            </For>
            
            {/* Spacer for total height */}
            <tr style={{ height: `${rowVirtualizer().getTotalSize()}px`, visibility: "hidden" }}>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div class={styles.footer}>
        Showing {filteredRows().length} of {props.data.length} rows
      </div>
    </div>
  )
}

export default VirtualizedDataTable

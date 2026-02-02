/**
 * Reusable Data Table – optional section title + configurable columns and rows.
 * Title is built in (no separate SectionHeader).
 * @param {Array<{key: string, header: string, align?: 'left'|'right'|'center', render?: (row, rowIndex) => ReactNode}>} columns - Column config
 * @param {Array<Object>} data - Array of row objects (keys match column.key)
 * @param {string} [title] - Optional section title (e.g. "5 Most Bought Products")
 * @param {boolean} [showDivider=true] - Show hr below title when title is set
 * @param {string} [className] - Optional extra CSS classes for wrapper
 * @param {string} [tableClassName] - Optional extra CSS classes for table
 * @param {string} [minWidth] - Optional min-width for table (e.g. "400px")
 */
const ProductsTable = ({
  columns = [],
  data = [],
  title,
  showDivider = true,
  className = "",
  tableClassName = "",
  minWidth = "400px",
}) => (
  <div>
    {title && (
      <>
        <p className="text-lg font-semibold text-black mb-1">{title}</p>
        {showDivider && <hr className="border-gray-400 mb-2" />}
      </>
    )}
    <div className={`overflow-x-auto ${className}`.trim()}>
      <table className={`w-full text-sm ${tableClassName}`.trim()} style={{ minWidth }}>
        <thead>
          <tr className="border-b border-gray-200 text-left h-12">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-2 px-2 font-medium text-gray-700 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""
                  }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100 last:border-0">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-2.5 px-2 text-gray-900 ${col.align === "right" ? "text-right text-gray-700" : col.align === "center" ? "text-center" : ""
                    }`}
                >
                  {col.render ? col.render(row, rowIndex) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProductsTable;

/**
 * Reusable Stats Grid – section title/subtitle + responsive grid of StatCards.
 * Title and subtitle are built in (no separate SectionHeader).
 * @param {Array<{label: string, value: string|number}>} stats - Array of { label, value }
 * @param {string} [title] - Optional section title (e.g. "Raquel Dailey's Stats")
 * @param {string} [subtitle] - Optional subtitle (e.g. "Last ordered on ...")
 * @param {boolean} [showDivider=true] - Show hr below title when title is set
 * @param {string} [className] - Optional extra CSS classes for the grid
 * @param {string} [gridCols] - Tailwind grid classes
 */
const StatsCards = ({
  stats = [],
  title,
  subtitle,
  showDivider = true,
  className = "",
  gridCols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2",
}) => (
  <div>
    {title && (
      <>
        <p className="text-lg font-semibold text-black mb-1">{title}</p>
        {showDivider && <hr className="border-gray-400" />}
        {subtitle && <p className="text-sm font-medium text-[#212529bf] mb-3 mt-2">{subtitle}</p>}
      </>
    )}
    <div className={`grid ${gridCols} ${className}`.trim()}>
      {stats.map(({ label, value }) => (
        <>
          <div className={`border border-gray-200 rounded-sm bg-white p-2.5 ${className}`.trim()}>
            <p className="text-xs text-[#212529] font-semibold">{label}</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{value}</p>
          </div>
        </>
      ))}
    </div>
  </div>
);

export default StatsCards;

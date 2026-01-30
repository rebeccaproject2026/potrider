/**
 * Get date range for analytics tabs
 * @param {string} tab - 'today', 'thisMonth', or 'lastMonth'
 * @returns {Object} - { startDate, endDate, compareStartDate, compareEndDate }
 */
export function getDateRange(tab) {
  const now = new Date();
  let startDate, endDate, compareStartDate, compareEndDate;

  switch (tab) {
    case "today":
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);

      compareStartDate = new Date(now);
      compareStartDate.setDate(now.getDate() - 1);
      compareStartDate.setHours(0, 0, 0, 0);
      compareEndDate = new Date(now);
      compareEndDate.setDate(now.getDate() - 1);
      compareEndDate.setHours(23, 59, 59, 999);
      break;

    case "thisMonth":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);

      compareStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      compareEndDate = new Date(now.getFullYear(), now.getMonth(), 0);
      compareEndDate.setHours(23, 59, 59, 999);
      break;

    case "lastMonth":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      endDate.setHours(23, 59, 59, 999);

      // eslint-disable-next-line no-case-declarations
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      // eslint-disable-next-line no-case-declarations
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      // eslint-disable-next-line no-case-declarations
      const daysDiff = Math.ceil(
        (lastMonthEnd.getTime() - lastMonthStart.getTime()) / (1000 * 60 * 60 * 24)
      );

      compareStartDate = new Date(lastMonthStart);
      compareStartDate.setDate(lastMonthStart.getDate() - daysDiff);
      compareEndDate = new Date(lastMonthStart);
      compareEndDate.setDate(lastMonthStart.getDate() - 1);
      compareEndDate.setHours(23, 59, 59, 999);
      break;

    default:
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);
      compareStartDate = new Date(now);
      compareStartDate.setDate(now.getDate() - 1);
      compareStartDate.setHours(0, 0, 0, 0);
      compareEndDate = new Date(now);
      compareEndDate.setDate(now.getDate() - 1);
      compareEndDate.setHours(23, 59, 59, 999);
  }

  return {
    startDate,
    endDate,
    compareStartDate,
    compareEndDate,
  };
}

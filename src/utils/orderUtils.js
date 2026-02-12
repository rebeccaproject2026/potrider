// Order utility functions

export const getDeliveryBadgeIcon = (status) => {
  let clr = "#00B159";
  let bg = "#CEF1E0";

  // Convert to uppercase for comparison
  const statusUpper = status?.toUpperCase() || '';

  if (statusUpper.includes("DELIVERED")) {
    bg = "#cef1e0";
    clr = "#00b159";
  } else if (statusUpper.includes("PENDING")) {
    bg = "#e3eeff";
    clr = "#0066ff";
  } else if (statusUpper === "RESCHEDULED") {
    bg = "#dafffe";
    clr = "#17bcb9";
  } else if (statusUpper.includes("RESCHEDULE_REQUEST")) {
    bg = "#f9dffe";
    clr = "#9c27b0";
  } else if (statusUpper.includes("PROGRESS")) {
    bg = "#FFF5E5";
    clr = "#FFA500";
  } else if (statusUpper.includes("CANCELLED")) {
    bg = "#feeceb";
    clr = "#f44336";
  }

  const badgeIcon = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="18" fill="${bg}" />
    <g clip-path="url(#clip0_2037_54675)">
        <path
            d="M20.25 22.5H12C11.2044 22.5 10.4413 22.1839 9.87868 21.6213C9.31607 21.0587 9 20.2956 9 19.5V13.5C9 12.5054 9.39509 11.5516 10.0983 10.8483C10.8016 10.1451 11.7554 9.75 12.75 9.75H16.5C16.9925 9.75 17.4801 9.847 17.9351 10.0355C18.39 10.2239 18.8034 10.5001 19.1517 10.8483C19.4999 11.1966 19.7761 11.61 19.9645 12.0649C20.153 12.5199 20.25 13.0075 20.25 13.5V22.5ZM27 17.25V16.5C27 16.0075 26.903 15.5199 26.7145 15.0649C26.5261 14.61 26.2499 14.1966 25.9016 13.8483C25.5534 13.5001 25.14 13.2239 24.6851 13.0355C24.2301 12.847 23.7425 12.75 23.25 12.75H21.75V17.25H27ZM21.75 18.75V22.5H24C24.7956 22.5 25.5587 22.1839 26.1213 21.6213C26.6839 21.0587 27 20.2956 27 19.5V18.75H21.75ZM12.0435 24C12.016 24.1232 12.0014 24.2488 12 24.375C12 24.8723 12.1975 25.3492 12.5492 25.7008C12.9008 26.0525 13.3777 26.25 13.875 26.25C14.3723 26.25 14.8492 26.0525 15.2008 25.7008C15.5525 25.3492 15.75 24.8723 15.75 24.375C15.7486 24.2488 15.734 24.1232 15.7065 24H12.0435ZM20.2935 24C20.266 24.1232 20.2514 24.2488 20.25 24.375C20.25 24.8723 20.4475 25.3492 20.7992 25.7008C21.1508 26.0525 21.6277 26.25 22.125 26.25C22.6223 26.25 23.0992 26.0525 23.4508 25.7008C23.8025 25.3492 24 24.8723 24 24.375C23.9986 24.2488 23.984 24.1232 23.9565 24H20.2935Z"
            fill="${clr}" />
    </g>
    <defs>
        <clipPath id="clip0_2037_54675">
            <rect width="18" height="18" fill="white" transform="translate(9 9)" />
        </clipPath>
    </defs>
</svg>`;

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(badgeIcon);
};

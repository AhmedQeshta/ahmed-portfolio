// Duration of work
export const durationOfWork = (startDate: string, endDate: string, current: boolean) => {
  if (current || !endDate) {
    return `${formatDate(startDate)} - Present`;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate total months between dates
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (years === 0) {
    return `${formatDateDuration(startDate, endDate)} |  ${totalMonths}m`;
  } else if (remainingMonths === 0) {
    return `${formatDateDuration(startDate, endDate)}  |  ${years}y`;
  } else {
    return `${formatDateDuration(startDate, endDate)}  |  ${years}y ${remainingMonths}m`;
  }
};

// format date to be like this (2023 jan)
export const formatDate = (date: string) => {
  const start = new Date(date);
  return `${start.getFullYear()} ${start.toLocaleString('default', { month: 'short' })}`;
};

export const formatDateDuration = (startDate: string, endDate: string) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

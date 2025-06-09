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

  const durationTime =
    years === 0
      ? `${totalMonths}m`
      : remainingMonths === 0
        ? `${years}y`
        : `${years}y ${remainingMonths}m`;

  return `${formatDateDuration(startDate, endDate)}  |  ${durationTime}`;
};

// format date to be like this (2023 jan)
export const formatDate = (date: string) => {
  const start = new Date(date);
  return `${start.getFullYear()} ${start.toLocaleString('default', { month: 'short' })}`;
};

export const formatDateDuration = (startDate: string, endDate: string) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

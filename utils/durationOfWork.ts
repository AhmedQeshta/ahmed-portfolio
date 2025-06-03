// Duration of work
export const durationOfWork = (startDate: string, endDate: string, current: boolean) => {
  if (current || !endDate) {
    return `${formatDate(startDate)} - Present`;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = end.getTime() - start.getTime();
  const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(duration / (1000 * 60 * 60 * 24 * 30));
  return `${formatDate(startDate)} - ${formatDate(endDate)}  |  ${years}y ${months}m`;
};

// format date to be like this (2023 jan)
export const formatDate = (date: string) => {
  const start = new Date(date);
  return `${start.getFullYear()} ${start.toLocaleString('default', { month: 'short' })}`;
};

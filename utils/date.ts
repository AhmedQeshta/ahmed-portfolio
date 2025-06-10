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

export const formatDateDuration = (startDate: string, endDate: string) => {
  return `${formatDate(startDate, false)} - ${formatDate(endDate, false)}`;
};

export const formatDate = (dateString: string, hasDay = true) => {
  return new Date(dateString).toLocaleDateString(
    'en-US',
    hasDay
      ? {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      : {
          year: 'numeric',
          month: 'short',
        },
  );
};

export const formatReadingTime = (time?: number) => {
  return time ? `${time} min read` : '5 min read';
};

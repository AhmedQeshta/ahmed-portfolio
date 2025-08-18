import { ISortByDate } from '@/features/works/types/work';

export default function sortByDate({ works }: ISortByDate) {
  // Sort works by startDate (newest first) and then by endDate (ongoing first)
  return [...works].sort((a, b) => {
    // First compare by startDate (descending - newest first)
    // Handle potentially missing startDates (although they should always exist)
    const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
    const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
    const startDateComparison = dateB - dateA;

    if (startDateComparison !== 0) {
      return startDateComparison;
    }

    // If startDates are equal, sort by endDate (null/undefined endDate means current job)
    // Current jobs (no endDate) should appear first
    if (!a.endDate && b.endDate) return -1;
    if (a.endDate && !b.endDate) return 1;
    if (!a.endDate && !b.endDate) return 0;

    // Both have endDates, compare them (descending - most recent end date first)
    const endDateA = a.endDate ? new Date(a.endDate).getTime() : 0;
    const endDateB = b.endDate ? new Date(b.endDate).getTime() : 0;
    return endDateB - endDateA;
  });
}

import { durationOfWork, formatDateDuration, formatDate, formatReadingTime } from '../date';

describe('date utilities', () => {
  describe('formatDate function', () => {
    it('should format date with day', () => {
      const result = formatDate('2023-05-15');
      expect(result).toBe('May 15, 2023');
    });

    it('should format date without day', () => {
      const result = formatDate('2023-05-15', false);
      expect(result).toBe('May 2023');
    });
  });

  describe('formatDateDuration function', () => {
    it('should format a date range correctly', () => {
      const result = formatDateDuration('2022-01-01', '2023-05-15');
      expect(result).toBe('Jan 2022 - May 2023');
    });
  });

  describe('durationOfWork function', () => {
    it('should show "Present" for current jobs', () => {
      const result = durationOfWork('2022-01-01', '2023-05-15', true);
      expect(result).toBe('January 1, 2022 - Present');
    });

    it('should calculate duration in years and months for past jobs', () => {
      const result = durationOfWork('2022-01-01', '2023-05-15', false);
      expect(result).toBe('Jan 2022 - May 2023  |  1y 4m');
    });

    it('should display only months if less than a year', () => {
      const result = durationOfWork('2023-01-01', '2023-05-15', false);
      expect(result).toBe('Jan 2023 - May 2023  |  4m');
    });

    it('should display only years if exactly X years', () => {
      const result = durationOfWork('2021-05-15', '2023-05-15', false);
      expect(result).toBe('May 2021 - May 2023  |  2y');
    });

    it('should handle missing end date', () => {
      const result = durationOfWork('2022-01-01', '', true);
      expect(result).toBe('January 1, 2022 - Present');
    });
  });

  describe('formatReadingTime function', () => {
    it('should format reading time correctly', () => {
      const result = formatReadingTime(10);
      expect(result).toBe('10 min read');
    });

    it('should return default reading time when no time is provided', () => {
      const result = formatReadingTime();
      expect(result).toBe('5 min read');
    });

    it('should handle zero reading time', () => {
      const result = formatReadingTime(0);
      expect(result).toBe('5 min read');
    });
  });
});

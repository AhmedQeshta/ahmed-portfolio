import {
  cn,
  getStatusColor,
  getEmploymentTypeColor,
  getLocationTypeColor,
} from '@/features/shard/utils/statusColor';

describe('statusColor utilities', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-200', 'p-4');
      expect(result).toBe('text-red-500 bg-blue-200 p-4');
    });

    it('should handle conditional class names', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class active-class');
    });

    it('should handle falsy values', () => {
      const result = cn('base-class', false && 'hidden', undefined, null);
      expect(result).toBe('base-class');
    });
  });

  describe('getStatusColor function', () => {
    it('should return green color for completed status', () => {
      const result = getStatusColor('completed');
      expect(result).toBe('text-green-400 bg-green-500/10 border-green-500/30');
    });

    it('should return blue color for in-progress status', () => {
      const result = getStatusColor('in-progress');
      expect(result).toBe('text-blue-400 bg-blue-500/10 border-blue-500/30');
    });

    it('should return yellow color for on-hold status', () => {
      const result = getStatusColor('on-hold');
      expect(result).toBe('text-yellow-400 bg-yellow-500/10 border-yellow-500/30');
    });

    it('should return default gray color for unknown status', () => {
      const result = getStatusColor('unknown-status');
      expect(result).toBe('text-gray-400 bg-gray-500/10 border-gray-500/30');
    });
  });

  describe('getEmploymentTypeColor function', () => {
    it('should return green color for full-time employment', () => {
      const result = getEmploymentTypeColor('full-time');
      expect(result).toBe('text-green-400 bg-green-500/10 border-green-500/30');
    });

    it('should return blue color for part-time employment', () => {
      const result = getEmploymentTypeColor('part-time');
      expect(result).toBe('text-blue-400 bg-blue-500/10 border-blue-500/30');
    });

    it('should return purple color for freelance employment', () => {
      const result = getEmploymentTypeColor('freelance');
      expect(result).toBe('text-purple-400 bg-purple-500/10 border-purple-500/30');
    });

    it('should return orange color for contract employment', () => {
      const result = getEmploymentTypeColor('contract');
      expect(result).toBe('text-orange-400 bg-orange-500/10 border-orange-500/30');
    });

    it('should return cyan color for internship employment', () => {
      const result = getEmploymentTypeColor('internship');
      expect(result).toBe('text-cyan-400 bg-cyan-500/10 border-cyan-500/30');
    });

    it('should return default gray color for unknown employment type', () => {
      const result = getEmploymentTypeColor('unknown-type');
      expect(result).toBe('text-gray-400 bg-gray-500/10 border-gray-500/30');
    });
  });

  describe('getLocationTypeColor function', () => {
    it('should return blue color for remote location', () => {
      const result = getLocationTypeColor('remote');
      expect(result).toBe('text-blue-400 bg-blue-500/10 border-blue-500/30');
    });

    it('should return green color for on-site location', () => {
      const result = getLocationTypeColor('on-site');
      expect(result).toBe('text-green-400 bg-green-500/10 border-green-500/30');
    });

    it('should return purple color for hybrid location', () => {
      const result = getLocationTypeColor('hybrid');
      expect(result).toBe('text-purple-400 bg-purple-500/10 border-purple-500/30');
    });

    it('should return default gray color for unknown location type', () => {
      const result = getLocationTypeColor('unknown-location');
      expect(result).toBe('text-gray-400 bg-gray-500/10 border-gray-500/30');
    });
  });
});

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-400 bg-green-500/10 border-green-500/30';
    case 'in-progress':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    case 'on-hold':
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
  }
};

export const getEmploymentTypeColor = (type: string) => {
  switch (type) {
    case 'full-time':
      return 'text-green-400 bg-green-500/10 border-green-500/30';
    case 'part-time':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    case 'freelance':
      return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    case 'contract':
      return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    case 'internship':
      return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
  }
};

export const getLocationTypeColor = (type: string) => {
  switch (type) {
    case 'remote':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    case 'on-site':
      return 'text-green-400 bg-green-500/10 border-green-500/30';
    case 'hybrid':
      return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
  }
};

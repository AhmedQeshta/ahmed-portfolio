import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
      return 'text-green-500 bg-green-600/10 border-green-600/30';
    case 'part-time':
      return 'text-blue-500 bg-blue-600/10 border-blue-600/30';
    case 'freelance':
      return 'text-purple-500 bg-purple-600/10 border-purple-600/30';
    case 'contract':
      return 'text-orange-500 bg-orange-600/10 border-orange-600/30';
    case 'internship':
      return 'text-cyan-500 bg-cyan-600/10 border-cyan-600/30';
    default:
      return 'text-gray-500 bg-gray-600/10 border-gray-600/30';
  }
};

export const getLocationTypeColor = (type: string) => {
  switch (type) {
    case 'remote':
      return 'text-blue-500 bg-blue-600/10 border-blue-600/30';
    case 'on-site':
      return 'text-green-500 bg-green-600/10 border-green-600/30';
    case 'hybrid':
      return 'text-purple-500 bg-purple-600/10 border-purple-600/30';
    default:
      return 'text-gray-500 bg-gray-600/10 border-gray-600/30';
  }
};

export // Language-specific color mapping
const getLanguageColor = (language: string): string => {
  const languageColors: Record<string, string> = {
    javascript: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    typescript: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    python: 'text-green-400 bg-green-400/10 border-green-400/20',
    java: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    react: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    vue: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    angular: 'text-red-400 bg-red-400/10 border-red-400/20',
    html: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    css: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    scss: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
    sass: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
    less: 'text-blue-600 bg-blue-600/10 border-blue-600/20',
    json: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    xml: 'text-orange-600 bg-orange-600/10 border-orange-600/20',
    sql: 'text-blue-300 bg-blue-300/10 border-blue-300/20',
    bash: 'text-green-300 bg-green-300/10 border-green-300/20',
    shell: 'text-green-300 bg-green-300/10 border-green-300/20',
    powershell: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    php: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    ruby: 'text-red-500 bg-red-500/10 border-red-500/20',
    go: 'text-cyan-300 bg-cyan-300/10 border-cyan-300/20',
    rust: 'text-orange-300 bg-orange-300/10 border-orange-300/20',
    swift: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    kotlin: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    dart: 'text-blue-600 bg-blue-600/10 border-blue-600/20',
    c: 'text-blue-700 bg-blue-700/10 border-blue-700/20',
    'c++': 'text-blue-800 bg-blue-800/10 border-blue-800/20',
    'c#': 'text-purple-600 bg-purple-600/10 border-purple-600/20',
    csharp: 'text-purple-600 bg-purple-600/10 border-purple-600/20',
    yaml: 'text-red-300 bg-red-300/10 border-red-300/20',
    yml: 'text-red-300 bg-red-300/10 border-red-300/20',
    toml: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    dockerfile: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    markdown: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
    jsx: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    tsx: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  };

  const normalizedLang = language.toLowerCase().trim();
  return languageColors[normalizedLang] || 'text-gray-300 bg-gray-600/10 border-gray-600/20';
};

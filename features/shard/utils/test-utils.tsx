import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/features/theme/context/ThemeContext';

// Custom render function that includes ThemeProvider
function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { renderWithTheme as render };

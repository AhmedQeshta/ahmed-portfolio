export const apiVersion = process.env.SANITY_API_VERSION || '2025-06-03';

export const dataset = process.env.SANITY_DATASET || 'ahmed-qeshta-portfolio';

export const projectId = process.env.SANITY_PROJECT_ID || '0ew1aiai';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

export const apiVersion = process.env.SANITY_API_VERSION || '2025-06-03';

export const dataset = process.env.SANITY_DATASET || 'ahmed-qeshta-portfolio';

export const projectId = process.env.SANITY_PROJECT_ID || '0ew1aiai';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

// Validate Sanity configuration to prevent build crashes
export function validateSanityConfig(): boolean {
  const envProjectId = process.env.SANITY_PROJECT_ID || projectId;
  const envDataset = process.env.SANITY_DATASET || dataset;

  // Check if projectId and dataset are incorrectly set to the same value
  if (envProjectId === envDataset) {
    console.warn(
      `[Sanity Config Warning] projectId and dataset are set to the same value: "${envProjectId}". This is likely incorrect.`
    );
    return false;
  }

  // Check if required values are missing
  if (!envProjectId || !envDataset) {
    console.warn(
      '[Sanity Config Warning] Missing required Sanity environment variables. Build will continue but Sanity queries may fail.'
    );
    return false;
  }

  return true;
}

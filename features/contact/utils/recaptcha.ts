/**
 * Server-side reCAPTCHA v3 verification utility
 * Verifies the token with Google's reCAPTCHA API
 */

interface RecaptchaVerificationResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Verify reCAPTCHA token with Google's API
 * @param token - The reCAPTCHA token from the client
 * @param action - The expected action name (default: "contact_submit")
 * @param minScore - Minimum score threshold (0.0 to 1.0, default: 0.5)
 * @returns Promise<boolean> - true if verification passes, false otherwise
 */
export async function verifyRecaptcha(
  token: string | null,
  action: string = 'contact_submit',
  minScore: number = 0.5
): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('reCAPTCHA secret key is not configured');
    // In development, allow form submission if secret key is missing
    // In production, this should fail
    return process.env.NODE_ENV === 'development';
  }

  if (!token) {
    console.error('reCAPTCHA token is missing');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data: RecaptchaVerificationResponse = await response.json();

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return false;
    }

    // Verify the action matches
    if (data.action !== action) {
      console.error(`reCAPTCHA action mismatch: expected "${action}", got "${data.action}"`);
      return false;
    }

    // Verify the score meets the threshold
    if (data.score !== undefined && data.score < minScore) {
      console.error(`reCAPTCHA score too low: ${data.score} (minimum: ${minScore})`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

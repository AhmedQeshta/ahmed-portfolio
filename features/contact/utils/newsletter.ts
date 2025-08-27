import { IMailChimpRequest } from '@/features/contact/types/contact';

const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

const mailChimpURL = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

export const mailChimpRequest = async ({ email, name, newsletter }: IMailChimpRequest) => {
  if (!newsletter) return null;
  try {
    if (!apiKey || !audienceId || !serverPrefix) {
      throw new Error('Mailchimp API key, audience ID, or server prefix is missing');
    }

    const mailChimpData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name.split(' ')[0] || '',
        LNAME: name.split(' ').slice(1).join(' ') || '',
      },
    };

    const response = await fetch(mailChimpURL, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailChimpData),
    });

    if (!response.ok) {
      const mailChimpError = await response.json();
      console.log('Mail Chimp subscription failed:', mailChimpError);
      throw new Error(mailChimpError);
    } else {
      console.log('Successfully subscribed to newsletter:', email);
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    // Don't fail the entire contact form if newsletter subscription fails
  }
};

import { fetchAPI } from './base-query';

export async function newsletterSubscribe(email: string) {
  try {
    const response = await fetchAPI(
      `
      mutation SubscribeNewsletter($email: String!) {
        createNewsletterSubscription(input: { email: $email }) {
          newsletterSubscription {
            id
            email
            subscription_date
            status
          }
        }
      }
      `,
      {
        variables: { email }
      }
    );

    // Access the correct field in the response
    return response.createNewsletterSubscription.newsletterSubscription;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw new Error('Failed to subscribe to newsletter');
  }
}

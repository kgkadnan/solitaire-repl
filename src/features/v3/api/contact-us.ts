import { fetchAPI } from './base-query';

export async function createContactUsEntry(
  firstName: string,
  lastName: string,
  email: string,
  mobile: string,
  message: string
) {
  try {
    const response = await fetchAPI(
      `
      mutation CreateContactUsEntry($firstName: String!, $lastName: String!, $email: String!, $mobile: String!, $message: String!) {
        createContactUsEntry(input: { firstName: $firstName, lastName: $lastName, email: $email, mobile: $mobile, message: $message }) {
          contactUs {
            id
            firstName
            lastName
            email
            mobile
            message
          }
        }
      }
      `,
      {
        variables: { firstName, lastName, email, mobile, message }
      }
    );

    // Access the correct field in the response
    return response.createContactUsEntry.contactUs;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw new Error('Failed to subscribe to newsletter');
  }
}

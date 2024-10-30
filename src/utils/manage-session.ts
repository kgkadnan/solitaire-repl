// Define the type for session data
interface ISessionData {
  id: string;
  expiresAt: number;
}

// Function to generate a unique session ID
export function generateSessionId(): string {
  return (
    'sess_' + Math.random().toString(36).substr(2) + Date.now().toString(36)
  );
}

// Function to store session ID with expiration
export function storeSessionId(): string {
  try {
    const sessionId: string = generateSessionId();
    const expirationTime: number = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds

    const sessionData: ISessionData = {
      id: sessionId,
      expiresAt: expirationTime
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
    }

    return sessionId;
  } catch (error) {
    console.error('Error storing session ID:', error);
    return ''; // Return empty string in case of error
  }
}

// Function to check if session ID has expired and return the session ID
export function isSessionValid(): string {
  try {
    if (typeof window === 'undefined') return '';

    const sessionDataStr = sessionStorage.getItem('sessionData');
    if (!sessionDataStr) {
      // If there's no session data, create a new session
      return storeSessionId();
    }

    const sessionData: ISessionData = JSON.parse(sessionDataStr);
    const currentTime = Date.now();

    if (currentTime > sessionData.expiresAt) {
      // If the session has expired, create a new one
      sessionStorage.removeItem('sessionData');
      return storeSessionId();
    }

    return sessionData.id; // Return the existing session ID if valid
  } catch (error) {
    console.error('Error checking session validity:', error);
    return ''; // Return empty string in case of error
  }
}


export type AccountDetails = {
    accountUid: string;
    email: string;
    firstName: string;
    lastName: string;
    authenticated: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_HOSTNAME;


export const getAccountDetails = async (): Promise<AccountDetails> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/current-user`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
    });
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to fetch race');
  }
  return response.json();
}
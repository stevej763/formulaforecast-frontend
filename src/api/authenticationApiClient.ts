const API_BASE_URL = import.meta.env.VITE_API_HOSTNAME;

export type AccountCreationResponse = {
  accountUid: string;
};

export type AccountCreationRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type AccountLoginRequest = {
  email: string;
  password: string;
};

export type AccountLoginResponse = {
  ok: boolean;
};

export type AccountLogoutResponse = {
  ok: boolean;
};

export async function createAccount(
  accountCreationRequest: AccountCreationRequest
): Promise<AccountCreationResponse> {
  console.log("Creating account");
  console.log(API_BASE_URL);
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/create-account`, {
    method: "POST",
    body: JSON.stringify(accountCreationRequest),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    console.log(response);
    throw new Error("Account creation failed");
  }
  return response.json();
}

export async function login(
  accountLoginRequest: AccountLoginRequest
): Promise<AccountLoginResponse> {
  console.log("Fetching");
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "PUT",
    body: JSON.stringify(accountLoginRequest),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  console.log("Response received:", response);
  return { ok: response.ok };
}

export async function logout(): Promise<AccountLogoutResponse> {
  console.log("Fetching");
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });
  console.log("Response received:", response);
  return { ok: response.ok };
}

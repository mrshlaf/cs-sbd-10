/**
 * Marshal Store — API Client
 * Communicates with the Express.js backend from SBD Modul 8
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" && window.location.hostname !== "localhost" ? "/_/backend" : "http://localhost:5001");

/* ── Types ─────────────────────────────────── */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  payload: T;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  balance: number;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
  created_at?: string;
}

export interface RegisterInput {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

/* ── Helper ────────────────────────────────── */

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  // Attach JWT if available
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("marshal_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data: ApiResponse<T> = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

/* ── Auth API ──────────────────────────────── */

/** Login via /auth/login → returns JWT + user */
export async function loginUser(input: LoginInput): Promise<ApiResponse<AuthPayload>> {
  return request<AuthPayload>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/** Register via /user/register */
export async function registerUser(input: RegisterInput): Promise<ApiResponse<User>> {
  return request<User>("/user/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

/* ── Items API ─────────────────────────────── */

/** Get all items */
export async function fetchItems(): Promise<ApiResponse<Item[]>> {
  return request<Item[]>("/items");
}

/** Get single item by ID */
export async function fetchItemById(id: number): Promise<ApiResponse<Item>> {
  return request<Item>(`/items/${id}`);
}

/* ── User API ──────────────────────────────── */

/** Get user by email (cache-aside endpoint) */
export async function fetchUserByEmail(email: string): Promise<ApiResponse<User>> {
  return request<User>(`/user/${encodeURIComponent(email)}`);
}

/* ── Transaction API ────────────────────────── */

export interface Transaction {
  id: number;
  item_name?: string;
  quantity: number;
  total: number;
  status: 'pending' | 'paid';
  created_at: string;
}

/** Get transaction history for current user */
export async function fetchTransactionHistory(): Promise<ApiResponse<Transaction[]>> {
  return request<Transaction[]>("/user/history");
}

/** Create a new transaction */
export async function createTransaction(itemId: number, quantity: number): Promise<ApiResponse<Transaction>> {
  return request<Transaction>("/transaction/create", {
    method: "POST",
    body: JSON.stringify({ item_id: itemId, quantity }),
  });
}

/** Pay for a transaction */
export async function payTransaction(transactionId: number): Promise<ApiResponse<void>> {
  return request<void>(`/transaction/pay/${transactionId}`, {
    method: "POST",
  });
}

/** Top up user balance */
export async function topUpBalance(amount: number): Promise<ApiResponse<User>> {
  return request<User>("/user/top-up", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
}

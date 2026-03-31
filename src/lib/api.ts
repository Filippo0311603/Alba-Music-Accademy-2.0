// API endpoint configuration
// In production on Vercel we can use same-origin /api with rewrites.
const rawApiUrl = String(import.meta.env.VITE_API_URL || '').trim();
const runtimeFallbackApiUrl =
  typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8787'
    : '';

export const API_URL = (rawApiUrl || runtimeFallbackApiUrl).replace(/\/$/, '');
const apiTimeoutMs = Number(import.meta.env.VITE_API_TIMEOUT_MS || 20000);
const AUTH_TOKEN_KEY = 'alba_token';

function getAuthHeaders() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiCall(
  endpoint: string,
  options?: RequestInit,
): Promise<any> {
  const url = `${API_URL}${endpoint}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), apiTimeoutMs);

  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }).catch((error) => {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`La richiesta sta impiegando troppo tempo (${apiTimeoutMs / 1000}s). Riprova.`);
    }
    throw error;
  }).finally(() => {
    clearTimeout(timeout);
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const bookingAPI = {
  getSlots: (date: string) => apiCall(`/api/slots?date=${date}`),
  
  createBooking: (data: {
    date: string;
    time: string;
    notes?: string;
  }) => apiCall('/api/bookings', {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  }),

  getMyBookings: () =>
    apiCall('/api/user/bookings', {
      headers: {
        ...getAuthHeaders(),
      },
    }),

  cancelMyBooking: (bookingId: string) =>
    apiCall(`/api/user/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
    }),

  getMyProfile: () =>
    apiCall('/api/auth/me', {
      headers: {
        ...getAuthHeaders(),
      },
    }),

  logoutUser: () =>
    apiCall('/api/auth/logout', {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
    }),

  confirmBooking: (token: string) => 
    apiCall(`/api/bookings/confirm/${token}`),

  cancelBooking: (token: string) => 
    apiCall(`/api/bookings/cancel/${token}`),
};

export const adminAPI = {
  login: (username: string, password: string) => 
    apiCall('/api/admin/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    }),

  getSession: () => apiCall('/api/admin/auth/me', { credentials: 'include' }),

  logout: () => apiCall('/api/admin/auth/logout', { method: 'POST', credentials: 'include' }),

  getBookings: () => apiCall('/api/admin/bookings', { credentials: 'include' }),

  getSlots: (date: string) => apiCall(`/api/admin/slots?date=${date}`, { credentials: 'include' }),

  createManualBooking: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    date: string;
    time: string;
    notes?: string;
  }) =>
    apiCall('/api/admin/bookings/manual', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    }),

  cancelBooking: (id: string) => 
    apiCall(`/api/admin/bookings/${id}/cancel`, {
      method: 'POST',
      credentials: 'include',
    }),

  runReminders: () => apiCall('/api/admin/reminders/run', { method: 'POST', credentials: 'include' }),

  testSmtp: () => apiCall('/api/admin/smtp/test', { method: 'POST', credentials: 'include' }),
};

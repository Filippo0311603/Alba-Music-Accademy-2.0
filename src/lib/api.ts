// API endpoint configuration
// This will be injected at build time by Vercel or at runtime by the environment

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export async function apiCall(
  endpoint: string,
  options?: RequestInit,
): Promise<any> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
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
    fullName: string;
    email: string;
    phone: string;
    notes: string;
    date: string;
    time: string;
  }) => apiCall('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
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
      body: JSON.stringify({ username, password }),
    }),

  getSession: () => apiCall('/api/admin/auth/me'),

  logout: () => apiCall('/api/admin/auth/logout', { method: 'POST' }),

  getBookings: () => apiCall('/api/admin/bookings'),

  cancelBooking: (id: string) => 
    apiCall(`/api/admin/bookings/${id}/cancel`, {
      method: 'POST',
    }),

  runReminders: () => apiCall('/api/admin/reminders/run', { method: 'POST' }),

  testSmtp: () => apiCall('/api/admin/smtp/test', { method: 'POST' }),
};

import { fetchApi, fetchWithRefreshApi } from "../lib/api";

function toQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) q.append(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

async function parseJSON(res) {
  const text = await res.text().catch(() => "");
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}

async function request(path, {
  method = "GET",
  data,
  params,
  headers,
  useRefresh = true,
  ...rest
} = {}) {

  const isFormData = (typeof FormData !== "undefined") && data instanceof FormData;
  const opts = {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(headers || {})
    },
    ...(rest || {})
  };

  if (data !== undefined) {
    opts.body = isFormData ? data : JSON.stringify(data);
  }

  // add query string
  const urlWithParams = params ? `${path}${toQuery(params)}` : path;

  const doFetch = useRefresh ? fetchWithRefreshApi : fetchApi;
  const res = await doFetch(urlWithParams, opts);
  const json = await parseJSON(res);

  if (!res.ok) {
    const message = json?.error || json?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.details = json;
    throw err;
  }
  return { ok: true, status: res.status, data: json };
}


export const AuthAPI = {
  // POST /auth/register
  register(payload) {
    // payload: { name, username, email, password, ... }
    return request("/auth/register", { method: "POST", data: payload, useRefresh: false });
  },

  // POST /auth/login
  login(credentials) {
    return request("/auth/login", { method: "POST", data: credentials, useRefresh: false });
  },

  // POST /auth/logout
  logout() {
    return request("/auth/logout", { method: "POST", useRefresh: true });
  },

  // POST /auth/refresh
  refresh() {
    return request("/auth/refresh", { method: "POST", useRefresh: false });
  },

  // GET /auth/verify-email?token=...&email=...
  verifyEmail({ token, email }) {
    return request("/auth/verify-email", {
      method: "PATCH",
      params: { token, email },
      useRefresh: false
    });
  },

  // POST /auth/resend-verification
  resendVerification({ email }) {
    return request("/auth/resend-verification", {
      method: "POST",
      data: {email},
      useRefresh: false
    });
  },

  // POST /auth/forgot-password
  forgotPassword( email ) {
    return request("/auth/forgot-password", {
      method: "POST",
      data: { email },
      useRefresh: false
    });
  },

  // POST /auth/reset-password
  resetPassword({ token,email, password }) {
    return request("/auth/reset-password", {
      method: "POST",
      data: { token, password,email },
      useRefresh: false
    });
  },

  // GET /auth/me
  me() {
    return request("/auth/me", { method: "GET", useRefresh: true });
  },

  // PATCH /users/me
  updateProfile(partialProfile) {
    return request("/users/me", { method: "PATCH", data: partialProfile, useRefresh: true });
  },

  // POST /auth/change-password
  changePassword({ currentPassword, newPassword }) {
    return request("/auth/change-password", {
      method: "POST",
      data: { currentPassword, newPassword },
      useRefresh: true
    });
  },
};

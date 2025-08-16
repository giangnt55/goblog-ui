export const ENDPOINTS = {
  auth: {
    login: () => "/v1/auth/login",
    refresh: () => "/v1/auth/refresh",
    logout: () => "/v1/auth/logout",
  },
  me: () => "/v1/me",
  users: {
    list: (page = 1) => `/v1/users?page=${page}`,
    byId: (id: string) => `/v1/users/${id}`,
    create: () => "/v1/users",
  },
};

const BASE_URL = import.meta.env.VITE_BASE_URL

export const endpoints = {
  // Auth
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  PROFILE_API: `${BASE_URL}/auth/profile`,

  // Club
  CREATE_CLUB_API: `${BASE_URL}/clubs/create`,
  GET_ALL_CLUBS_API: `${BASE_URL}/clubs/all`,
  GET_CLUB_BY_ID_API: (clubId) => `${BASE_URL}/clubs/${clubId}`,
  GET_MY_CLUBS_API: `${BASE_URL}/clubs/my-clubs`,
  GET_CLUB_MEMBERS_API: (clubId) => `${BASE_URL}/clubs/members/${clubId}`,
  JOIN_CLUB_API: (clubId) => `${BASE_URL}/clubs/join/${clubId}`,
  LEAVE_CLUB_API: (clubId) => `${BASE_URL}/clubs/leave/${clubId}`,
  UPDATE_CLUB_API: (clubId) => `${BASE_URL}/clubs/update/${clubId}`,
  DELETE_CLUB_API: (clubId) => `${BASE_URL}/clubs/${clubId}`,
};
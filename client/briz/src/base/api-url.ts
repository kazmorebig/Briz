import { BASE_URL } from './base-api';
import type { state } from '@/components/controls/control.module';

export const API_URL = {
  PROGRAMS: `${BASE_URL}/program/list`,
  PROGRAM: (id: string) => `${BASE_URL}/program/${id}`,
  SET_STATE_BY_ID: (state: state, id: string): string =>
    `${BASE_URL}/program/${state}/${id}`,
  SESSIONS: `${BASE_URL}/sessions`,
  GET_ADMIN: `${BASE_URL}/admin`,
  CREATE_PROGRAM: `${BASE_URL}/program`,
  UPDATE_PROGRAM: (id: string) => `${BASE_URL}/program/${id}`,
  LOGIN: `${BASE_URL}/login`,
  LOGOUT: `${BASE_URL}/logout`,
};

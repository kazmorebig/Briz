import { BASE_URL } from './base-api';
import type { state } from '@/components/controls/control.module';

export const API_URL = {
  PROGRAMS: `${BASE_URL}/program/list`,
  SET_STATE_BY_ID: (state: state, id: number): string =>
    `${BASE_URL}/program/${state}/${id}`,
  SESSIONS: `${BASE_URL}/sessions`,
};

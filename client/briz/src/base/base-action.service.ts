import axios from 'axios';
import { correspondingAPI } from '@/base/corresponding-api.service';

const { message } = correspondingAPI();

export async function useGet<T>(url: string, errorMessage?: string) {
  return axios.get<T>(url).catch(() => {
    message.error(errorMessage ?? 'Возникла непредвиденная ошибка');
  });
}

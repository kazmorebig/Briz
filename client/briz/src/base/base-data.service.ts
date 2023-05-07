import type { AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';
import { reactive, toRefs } from 'vue';
import { correspondingAPI } from '@/base/corresponding-api.service';

const { message } = correspondingAPI();

interface ApiResponse<T> {
  data: null | T;
  error: string | null;
  loading: boolean;
}
export default async function useFetch<T>(
  url: string,
  errorMessage?: string,
  successMessage?: string
) {
  const state: ApiResponse<T> = reactive({
    data: null,
    error: null,
    loading: false,
  });

  const fetchData = async () => {
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      state.data = response.data;
      state.error = null;
      state.loading = true;
      //message.success(successMessage ?? 'Успешное выполнение запроса');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        state.error = error.message;
        state.loading = false;
        message.error(errorMessage ?? 'Возникла непредвиденная ошибка');
      }
    } finally {
      state.loading = false;
    }
  };

  await fetchData();
  return toRefs(state);
}

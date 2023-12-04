import { ref } from 'vue';
import BaseActionService from '@/base/base-action.service';
import { API_URL } from '@/base/api-url';

const isAdmin = ref<boolean>(false);
export function UserService() {
  function getAdminStatus() {
    BaseActionService.get<string>(
      API_URL.GET_ADMIN,
      {},
      undefined,
      'Ошибка при получении статуса админа'
    ).then((admin: string) => {
      isAdmin.value = Boolean(admin);
    });
  }

  return {
    isAdmin,
    getAdminStatus,
  };
}

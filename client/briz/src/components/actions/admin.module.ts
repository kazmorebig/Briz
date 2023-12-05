import BaseActionService from '@/base/base-action.service';
import { API_URL } from '@/base/api-url';
import { ref } from 'vue';
import { UserService } from '@/core/user.service';
const { getAdminStatus } = UserService();

const showAdminModalRef = ref(false);
const pinCode = ref();
export function adminModule() {
  function toggleAdminModal() {
    showAdminModalRef.value = !showAdminModalRef.value;
  }

  function loginAdmin() {
    if (pinCode.value === undefined) return;
    BaseActionService.post(
      API_URL.LOGIN,
      {
        pin_code: pinCode.value,
      },
      undefined,
      '',
      'Ошибка при входе'
    ).then(() => {
      showAdminModalRef.value = false;
      getAdminStatus();
    });
  }

  function logoutAdmin() {
    BaseActionService.get(
      API_URL.LOGOUT,
      {},
      undefined,
      'Ошибка при выходе'
    ).then(() => {
      getAdminStatus();
    });
  }

  return {
    showAdminModalRef,
    toggleAdminModal,
    loginAdmin,
    logoutAdmin,
    pinCode,
  };
}

<script setup lang="ts">
import { NModal } from 'naive-ui/es/modal';
import { NInput } from 'naive-ui';
import { adminModule } from '@/components/actions/admin.module';
import { NButton } from 'naive-ui/es/button';
import { NSpace } from 'naive-ui/es/space';
const { showAdminModalRef, loginAdmin, pinCode } = adminModule();
</script>

<template>
  <n-modal
    v-model:show="showAdminModalRef"
    :mask-closable="true"
    style="width: 600px"
    :title="$t('admin.title')"
    aria-modal="true"
    preset="card"
  >
    <n-space size="large" vertical align="center" justify="center">
      <n-input
        v-model:value="pinCode"
        type="password"
        show-password-on="click"
        class="admin-password"
        autocomplete="off"
        :maxlength="10"
      />
      <n-button quaternary style="display: flex" @click="loginAdmin">
        {{ $t('admin.enter') }}
      </n-button>
    </n-space>
  </n-modal>
</template>

<style scoped lang="scss">
.admin-password .n-input .n-input__input-el {
  background: transparent !important;
}
</style>

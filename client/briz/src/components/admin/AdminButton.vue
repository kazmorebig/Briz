<script setup lang="ts">
import { NButton } from 'naive-ui/es/button';
import { Key16Filled, DoorArrowRight16Filled } from '@vicons/fluent';
import { NIcon } from 'naive-ui/es/icon';
import { adminModule } from '@/components/actions/admin.module';
import { UserService } from '@/core/user.service';
const { isAdmin } = UserService();

const { toggleAdminModal, logoutAdmin } = adminModule();
</script>

<template>
  <n-button
    v-if="isAdmin"
    quaternary
    style="display: flex"
    @click="logoutAdmin"
  >
    <n-icon size="24" color="#ddd" :component="DoorArrowRight16Filled">
    </n-icon>
  </n-button>
  <n-button v-else quaternary style="display: flex" @click="toggleAdminModal">
    <n-icon size="24" color="#ddd" :component="Key16Filled"> </n-icon>
  </n-button>
</template>

<style scoped lang="scss"></style>

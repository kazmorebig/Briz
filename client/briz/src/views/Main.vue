<script setup lang="ts">
import MainDescription from '../components/decription/MainDescription.vue';
import ControlSystem from '@/components/controls/ControlSystem.vue';
import MenuButtons from '@/components/menu/MenuButtons.vue';
import ProgramList from '@/components/program/ProgramList.vue';
import { NGrid, NGridItem } from 'naive-ui';
import AdminModal from '@/components/admin/AdminModal.vue';
</script>

<template>
  <n-grid
    cols="1 s:1 m:3 l:3 xl:3 2xl:3"
    x-gap="20"
    y-gap="40"
    item-responsive
    responsive="screen"
  >
    <n-grid-item span="2 m:2 l:2 xl:2 2xl:2">
      <MainDescription />
      <ControlSystem></ControlSystem>
      <MenuButtons />
    </n-grid-item>
    <n-grid-item span="1">
      <ProgramList></ProgramList>
      <AdminModal></AdminModal>
    </n-grid-item>
  </n-grid>
</template>

<style scoped></style>

<script setup lang="ts">
import MainDescription from '../components/decription/MainDescription.vue';
import ControlSystem from '@/components/controls/ControlSystem.vue';
import MenuButtons from '@/components/menu/MenuButtons.vue';
import ProgramList from '@/components/program/ProgramList.vue';
import { NGrid, NGridItem } from 'naive-ui';
</script>

<template>
  <n-grid
    cols="3"
    x-gap="20"
    item-responsive
    responsive="self"
    :collapsed="true"
    :collapsed-rows="1"
  >
    <n-grid-item span="2 m:2 l:2">
      <MainDescription />
      <ControlSystem></ControlSystem>
      <MenuButtons />
    </n-grid-item>
    <n-grid-item span="1">
      <ProgramList></ProgramList>
    </n-grid-item>
  </n-grid>
</template>

<style scoped></style>

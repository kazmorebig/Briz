<script setup lang="ts">
import { programModule } from '@/components/program/program.module';
import ProgramItem from '@/components/program/ProgramItem.vue';
import { NSpace } from 'naive-ui/es/space';
import { NLayout, NLayoutSider } from 'naive-ui';

const { programs, isActive, setActiveById } = programModule();
</script>

<template>
  <div>
    <p>{{ $t('program.title') }}</p>
    <n-space vertical size="large">
      <n-layout has-sider :native-scrollbar="false" style="height: 450px">
        <n-layout-sider>
          <ProgramItem
            v-for="program of programs"
            :item="program"
            :key="program.id"
            style="margin-bottom: 10px; cursor: pointer"
            :active="isActive(program.id)"
            @click="setActiveById(program.id)"
          ></ProgramItem>
        </n-layout-sider>
      </n-layout>
    </n-space>
  </div>
</template>

<style scoped></style>

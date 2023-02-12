<script setup lang="ts">
import { programModule } from '@/components/program/program.module';
import ProgramItem from '@/components/program/ProgramItem.vue';
import { NSpace } from 'naive-ui/es/space';
import { NLayout, NLayoutSider } from 'naive-ui';
import { controlModule } from '@/components/controls/control.module';

const { programs, isActive, setActive } = programModule();
const { isActive: isRun, state } = controlModule();
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
            @click="setActive(program)"
          ></ProgramItem>
        </n-layout-sider>
      </n-layout>
    </n-space>
  </div>
</template>

<style scoped></style>

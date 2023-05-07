<script setup lang="ts">
import { programModule } from '@/components/program/program.module';
import ProgramItem from '@/components/program/ProgramItem.vue';
import { NSpace } from 'naive-ui/es/space';
import { NLayout, NLayoutContent, NCard, NIcon, NButton } from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';

const { programs, isActive, setActiveById } = programModule();
</script>

<template>
  <div>
    <n-space size="large" justify="center">
      <h3>{{ $t('program.title') }}</h3>
    </n-space>
    <n-space vertical size="large">
      <n-layout has-sider :native-scrollbar="false" style="height: 450px">
        <n-layout-content
          :collapsed-width="0"
          content-style="padding-top: 24px; padding-right: 15px"
        >
          <ProgramItem
            v-for="program of programs"
            :item="program"
            :key="program.id"
            style="margin-bottom: 10px; cursor: pointer"
            :active="isActive(program.id)"
            @click="setActiveById(program.id)"
          ></ProgramItem>
        </n-layout-content>
      </n-layout>
      <n-button size="small" class="create-button">
        <n-space justify="space-around" align="center" :wrap-item="false">
          <n-icon :component="Add12Regular"></n-icon>
          <span>{{ $t('program.create') }}</span>
        </n-space>
      </n-button>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
.create-button {
  width: 100%;
  height: 90px;
  border: #1e1e1e solid 1px;
  border-radius: 10px;
}
</style>

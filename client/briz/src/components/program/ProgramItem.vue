<script setup lang="ts">
import type { IProgram } from '@/components/program/program.type';
import { NCard, NButton, NIcon, NEllipsis } from 'naive-ui';
import { NSpace } from 'naive-ui/es/space';
import { Edit16Regular } from '@vicons/fluent';
import { Delete16Regular } from '@vicons/fluent';
import { programModule } from '@/components/program/program.module';
import { UserService } from '@/core/user.service';
const { openProgramEdit, deleteProgram } = programModule();

const { isAdmin } = UserService();

const props = defineProps<{
  item: IProgram;
  active: boolean;
  index: number;
}>();
</script>

<template>
  <n-card :class="active ? 'active-program' : ''">
    <n-space
      class="program-item"
      justify="start"
      size="small"
      :wrap-item="false"
    >
      <span class="program-item__index"> {{ index }} </span>
      <n-ellipsis style="max-width: 150px" :line-clamp="1">
        {{ item.name }}
      </n-ellipsis>
    </n-space>

    <n-button
      v-if="isAdmin"
      circle
      size="small"
      class="edit-button"
      @click.stop.prevent="openProgramEdit(item.id)"
    >
      <n-icon :component="Edit16Regular"></n-icon>
    </n-button>
    <n-button
      v-if="isAdmin"
      circle
      size="small"
      class="delete-button"
      @click.stop.prevent="deleteProgram(item.id)"
    >
      <n-icon :component="Delete16Regular"></n-icon>
    </n-button>
  </n-card>
</template>

<style scoped lang="scss">
@import 'src/styles/functions';

.program-item {
  &__index {
    margin-right: rem(10px);
  }
}
.active-program {
  background: var(--vt-c-black-soft) !important;
}
.edit-button {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.delete-button {
  position: absolute;
  right: 40px;
  bottom: 5px;
}
</style>

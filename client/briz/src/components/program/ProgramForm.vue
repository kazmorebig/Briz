<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NIcon,
  NSpace,
  NInputNumber,
} from 'naive-ui';
import { Add12Regular } from '@vicons/fluent';
import { Delete24Regular } from '@vicons/fluent';
import { useProgramForm } from '@/components/program/program-form.module';
import { useResize } from '@/module/resize';
const { formRef, programFormValue, addAction, deleteAction } = useProgramForm();
const { smallResolution } = useResize();
</script>

<template>
  <n-form style="width: 100%" ref="formRef" :model="programFormValue">
    <n-form-item :label="$t('program.form.name')" path="name">
      <n-input v-model:value="programFormValue.name"></n-input>
    </n-form-item>
    <n-form-item :label="$t('program.form.description')" path="description">
      <n-input
        type="textarea"
        v-model:value="programFormValue.description"
      ></n-input>
    </n-form-item>
    <n-form-item
      v-for="(action, index) in programFormValue.actions"
      :key="index"
    >
      <n-space
        class="action-item"
        :justify="smallResolution ? 'center' : 'space-evenly'"
        align="center"
        :wrap-item="true"
        :wrap="true"
      >
        <n-space align="center" justify="center">
          <p>
            {{ $t('program.action.period') }}
          </p>
          <n-input-number
            max="7200"
            min="0"
            step="10"
            v-model:value="action.duration"
            button-placement="both"
          />
        </n-space>
        <n-space align="center" justify="center">
          <p>
            {{ $t('program.action.volume') }}
          </p>
          <n-input-number
            max="100"
            min="0"
            step="10"
            v-model:value="action.value"
            button-placement="both"
          />
        </n-space>

        <n-button size="large" @click="deleteAction(index)">
          <template #icon>
            <n-icon
              :size="smallResolution ? '24' : '32'"
              :component="Delete24Regular"
            ></n-icon>
          </template>
        </n-button>
      </n-space>
    </n-form-item>
    <n-button size="small" icon-placement="right" @click="addAction()">
      <template #icon>
        <n-icon :component="Add12Regular"></n-icon>
      </template>
      <span>{{ $t('program.action.add') }}</span>
    </n-button>
  </n-form>
</template>

<style lang="scss" scoped>
@import 'src/styles/functions';

.action-item {
  width: 100%;
  background: #1e1e1e;
  padding: rem(22px);
  border-radius: rem(10px);
}
.n-input-number {
  width: rem(200px);
  text-align: center;
}
.n-input__prefix {
  width: rem(60px) !important;
}
.n-input__suffix {
  width: rem(60px) !important;
}
</style>

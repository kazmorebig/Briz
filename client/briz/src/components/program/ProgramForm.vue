<script setup lang="ts">
import { NForm, NFormItem, NInput } from 'naive-ui';
import { ProgramForm } from '@/components/program/program-form.module';
import ActionEdit from '@/components/actions/ActionEdit.vue';
const { formRef, programFormValue } = ProgramForm();
</script>

<template>
  <n-form ref="formRef" :model="programFormValue">
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
      <action-edit :action="action"></action-edit>
    </n-form-item>
  </n-form>
</template>

<style lang="scss" scoped></style>

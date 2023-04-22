<script setup lang="ts">
import { NButton } from 'naive-ui/es/button';
import { NModal } from 'naive-ui/es/modal';
import { ref } from 'vue';
import { programModule } from '@/components/program/program.module';

const showModal = ref(false);
const { programDescription } = programModule();
</script>

<template>
  <div class="wrapper">
    <h2>{{ $t('main.title') }}</h2>
    <div>
      <p>{{ programDescription }}</p>
      <n-button
        v-if="programDescription"
        size="small"
        class="display: span"
        text
        quaternary
        @click="showModal = true"
        >{{ $t('main.buttonTitle') }}</n-button
      >
    </div>
  </div>
  <n-modal
    v-model:show="showModal"
    :mask-closable="true"
    style="width: 600px"
    :title="$t('main.title')"
    aria-modal="true"
    preset="card"
  >
    <p>{{ programDescription }}</p>
  </n-modal>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 616px;

  h2 {
    text-align: center;
  }
}
</style>

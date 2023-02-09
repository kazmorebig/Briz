<script setup lang="ts">
import { NButton } from 'naive-ui/es/button';
import { NModal } from 'naive-ui/es/modal';
import { ref } from 'vue';

const showModal = ref(false);
</script>

<template>
  <div class="wrapper">
    <h2>{{ $t('main.title') }}</h2>
    <div>
      <span v-html="$t('main.desc')"></span>
      <n-button
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
    <p>{{ $t('main.modalTitle') }}</p>
    <p>{{ $t('main.modalList') }}</p>
    <li v-for="item of $t('main.modalList')" :key="item">
      {{ item }}
    </li>
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

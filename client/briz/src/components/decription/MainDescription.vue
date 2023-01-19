<script setup lang="ts">
import { NButton } from 'naive-ui/es/button';
import { NModal } from 'naive-ui/es/modal';
import { ref } from 'vue';

const showModal = ref(false);
</script>

<template>
  <div class="wrapper">
    <h2>{{ $t('main.title') }}</h2>
    <p>
      {{ $t('main.desc') }}
      <n-button quaternary @click="showModal = true">Default</n-button>
    </p>
  </div>
  <n-modal
    v-model:show="showModal"
    :mask-closable="true"
    style="width: 600px"
    :title="$t('main.title')"
    aria-modal="true"
  >
    <template #header-extra> Oops! </template>
    <p>{{ $t('main.desc') }}</p>
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

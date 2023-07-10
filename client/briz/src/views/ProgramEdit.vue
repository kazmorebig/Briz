<script lang="ts" setup>
import ProgramPage from '@/components/program/ProgramPage.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Program } from '@/components/program/program.class';
import BaseActionService from '@/base/base-action.service';
import { API_URL } from '@/base/api-url';
import { useProgramForm } from '@/components/program/program-form.module';
const { setProgram } = useProgramForm();

const program = ref<Program | null>(null);
onMounted(async () => {
  const route = useRoute();
  const id = route.params.id;

  program.value = await BaseActionService.get<Program>(
    API_URL.PROGRAM(id as string)
  );
  setProgram(program.value);
});
</script>

<template>
  <ProgramPage v-if="program" :title="$t('program.editTitle')" :item="program">
  </ProgramPage>
  <div v-else>
    <p>Нe удалось заггрузить программу</p>
  </div>
</template>

<style scoped></style>

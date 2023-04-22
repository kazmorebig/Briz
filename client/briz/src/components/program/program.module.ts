import type { Ref } from 'vue';
import { onMounted, readonly, ref, watch } from 'vue';
import type { Program, Action } from '@/components/program/program.type';
import { API_URL } from '@/base/api-url';
import useFetch from '@/base/base-data.service';

const sessionPeriod: Ref<number> = ref(0);
const programs: Ref<Program[]> = ref([]);
const programDescription: Ref<string | undefined> = ref();
const activeProgram: Ref<Program | undefined> = ref();
const activeProgramId: Ref<string | undefined> = ref();
const actions: Ref<Action[] | undefined> = ref();

export function programModule() {
  async function fetchPrograms() {
    const { data } = await useFetch<Program[]>(API_URL.PROGRAMS);
    programs.value = data.value || [];
  }

  onMounted(async () => {
    await fetchPrograms();
  });

  function isActive(id: string): boolean {
    if (!activeProgram.value) return false;
    return activeProgram.value.id === id;
  }

  function setActive(active: Program): void {
    activeProgram.value = JSON.parse(JSON.stringify(active));
    actions.value = JSON.parse(JSON.stringify(activeProgram.value?.actions));
    sessionPeriod.value = actions.value
      ? actions.value.reduce((acc, a) => acc + a.duration, 0)
      : 0;
    activeProgramId.value = activeProgram.value?.id;
    programDescription.value = activeProgram.value?.description;
  }

  return {
    programs,
    activeProgram,
    activeProgramId,
    programDescription,
    isActive,
    setActive,
    sessionPeriod: readonly(sessionPeriod),
  };
}

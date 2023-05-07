import type { Ref } from 'vue';
import { onMounted, readonly, ref } from 'vue';
import type { Program, Action } from '@/components/program/program.type';
import { API_URL } from '@/base/api-url';
import useFetch from '@/base/base-data.service';

const sessionPeriod: Ref<number> = ref(0);
const programs: Ref<Program[]> = ref([]);
const programDescription: Ref<string | undefined> = ref();
const activeProgram: Ref<Program | undefined> = ref();
const activeProgramId: Ref<number | undefined> = ref();
const actions: Ref<Action[] | undefined> = ref();

export function programModule() {
  async function fetchPrograms() {
    const { data } = await useFetch<Program[]>(API_URL.PROGRAMS);
    programs.value = data.value || [];
    console.log(programs.value);
  }

  onMounted(async () => {
    await fetchPrograms();
  });

  function isActive(id: number): boolean {
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

  function setActiveById(programId: number) {
    if (programId !== -1) {
      activeProgramId.value = programId;
      activeProgram.value = programs.value.find(
        (program) => program.id === programId
      );
      actions.value = JSON.parse(JSON.stringify(activeProgram.value?.actions));
      sessionPeriod.value = actions.value
        ? actions.value.reduce((acc, a) => acc + a.duration, 0)
        : 0;
      programDescription.value = activeProgram.value?.description;
    }
  }

  return {
    programs,
    activeProgram,
    activeProgramId,
    programDescription,
    isActive,
    setActive,
    setActiveById,
    sessionPeriod: readonly(sessionPeriod),
  };
}

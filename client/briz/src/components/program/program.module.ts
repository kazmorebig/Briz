import type { Ref } from 'vue';
import { onMounted, readonly, ref } from 'vue';
import type { Program, Action } from '@/components/program/program.type';
import axios from 'axios';
import { BASE_API } from '@/base/base-api';

const sessionPeriod: Ref<number> = ref(0);
const programs: Ref<Program[]> = ref([]);
const activeProgram: Ref<Program | undefined> = ref();
const activeProgramId: Ref<string | undefined> = ref();
const actions: Ref<Action[] | undefined> = ref();

export function programModule() {
  onMounted(async () => {
    const getPrograms = await axios.get(BASE_API + 'program/list');
    programs.value = getPrograms.data;
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
  }

  return {
    programs,
    activeProgram,
    activeProgramId,
    isActive,
    setActive,
    sessionPeriod: readonly(sessionPeriod),
  };
}

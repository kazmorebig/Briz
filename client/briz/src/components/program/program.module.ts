import type { Ref } from 'vue';
import { onMounted, readonly, ref } from 'vue';
import type { IProgram } from '@/components/program/program.type';
import { API_URL } from '@/base/api-url';
import useFetch from '@/base/base-data.service';
import { useRouter } from 'vue-router';
import { Program } from '@/components/program/program.class';
import type { Action } from '@/components/program/action.class';
import { plainToClass } from 'class-transformer';
import BaseActionService from '@/base/base-action.service';

const sessionPeriod: Ref<number> = ref(0);
const programs: Ref<Program[]> = ref([]);
const programDescription: Ref<string | undefined> = ref();
const activeProgram: Ref<Program | undefined> = ref();
const activeProgramId: Ref<string | undefined> = ref();
const actions: Ref<Action[] | undefined> = ref();

export function programModule() {
  const router = useRouter();

  async function fetchPrograms() {
    const { data } = await useFetch<Program[]>(API_URL.PROGRAMS);
    programs.value = plainToClass(Program, data.value as Program[]) || [];
  }

  function isActive(id: string | null): boolean {
    if (!activeProgram.value || id === null) return false;
    return activeProgram.value.id === id;
  }

  function setActive(active: IProgram): void {
    activeProgram.value = JSON.parse(JSON.stringify(active));
    actions.value = JSON.parse(JSON.stringify(activeProgram.value?.actions));
    sessionPeriod.value = actions.value
      ? actions.value.reduce((acc, a) => acc + a.duration, 0)
      : 0;
    activeProgramId.value = activeProgram.value?.id ?? undefined;
    programDescription.value = activeProgram.value?.description;
  }

  function setActiveById(programId: string | null) {
    if (programId === null) return;
    if (programId !== '') {
      activeProgramId.value = programId;
      activeProgram.value = programs.value.find(
        (program) => program.id === programId
      );
      actions.value = activeProgram.value?.actions;
      sessionPeriod.value = actions.value
        ? actions.value.reduce((acc, a) => acc + a.duration, 0)
        : 0;
      programDescription.value = activeProgram.value?.description;
    }
  }

  function openProgramCreation() {
    router.push({ name: 'create-program' }).then();
  }

  function openProgramEdit(id: string | null) {
    if (id === null) return;
    router.push({ name: 'edit-program', params: { id: id } }).then();
  }

  function deleteProgram(id: string | null) {
    if (id === null) return;
    BaseActionService.delete(API_URL.PROGRAM(id)).then(() => {
      fetchPrograms();
    });
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
    openProgramCreation,
    openProgramEdit,
    deleteProgram,
    fetchPrograms,
  };
}

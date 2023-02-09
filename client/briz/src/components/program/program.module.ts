import type { Ref } from 'vue';
import { readonly, ref } from 'vue';
import type { Program, Action } from '@/components/program/program.type';
import json from '../../mock/settings.json';

const sessionPeriod: Ref<number> = ref(0);

export function programModule() {
  const programs: Ref<Program[]> = ref(json as unknown as Program[]);
  const activeProgram: Ref<Program | undefined> = ref();
  const actions: Ref<Action[] | undefined> = ref();
  //const sessionPeriod: Ref<number> = ref(0);

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
  }

  return {
    programs,
    activeProgram,
    isActive,
    setActive,
    sessionPeriod: readonly(sessionPeriod),
  };
}

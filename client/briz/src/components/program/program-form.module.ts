import { Program } from '@/components/program/program.class';
import { ref } from 'vue';
import type { FormInst } from 'naive-ui';
import { Action } from '@/components/program/action.class';

const emptyAction = new Action(0, 0, 0);
const emptyProgram = new Program('', null, '', [emptyAction]);

const formRef = ref<FormInst | null>(null);
const programFormValue = ref(emptyProgram);
export function ProgramForm() {
  return {
    formRef,
    programFormValue,
  };
}

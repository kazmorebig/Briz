import { Program } from '@/components/program/program.class';
import { h, ref } from 'vue';
import type { FormInst } from 'naive-ui';
import { Action } from '@/components/program/action.class';
import type { CountdownProps } from 'naive-ui';
import BaseActionService from '@/base/base-action.service';
import { API_URL } from '@/base/api-url';
import { plainToClass } from 'class-transformer';

const emptyAction = new Action(0, 0, 0);
const emptyProgram = new Program('', null, '', [emptyAction]);

const formRef = ref<FormInst | null>(null);
const programFormValue = ref(emptyProgram);
export function useProgramForm() {
  const renderCountdown: CountdownProps['render'] = ({
    hours,
    minutes,
    seconds,
  }) => {
    return [
      h(
        'span',
        {
          style: 'display: none;',
        },
        hours
      ),
      h(
        'span',
        {
          style: 'display: inline-block;',
        },
        minutes
      ),
      ' мин ',
      h(
        'span',
        {
          style: 'display: inline-block;',
        },
        seconds
      ),
      ' сек ',
    ];
  };

  function addAction() {
    const newAction = new Action(0, 0, 0);
    programFormValue.value.addAction(newAction);
  }

  function deleteAction(index: number) {
    programFormValue.value.deleteAction(index);
  }

  function saveProgram() {
    if (programFormValue.value.id) {
      BaseActionService.put(
        API_URL.UPDATE_PROGRAM(programFormValue.value.id),
        programFormValue.value,
        undefined,
        'Программа успешно обновлена'
      ).then(() => {});
    } else {
      BaseActionService.post(
        API_URL.CREATE_PROGRAM,
        programFormValue.value,
        undefined,
        'Программа успешно сохранена'
      ).then(() => {});
    }
  }

  function setProgram(program: null | Program) {
    if (program) {
      programFormValue.value = plainToClass(Program, program);
    }
  }

  return {
    formRef,
    programFormValue,
    addAction,
    deleteAction,
    renderCountdown,
    saveProgram,
    setProgram,
  };
}

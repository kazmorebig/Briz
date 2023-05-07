import type { Ref } from 'vue';
import { computed, h, ref } from 'vue';
import type { CountdownInst, CountdownProps } from 'naive-ui';
import { API_URL } from '@/base/api-url';
import BaseActionService from '@/base/base-action.service';

export enum stateEnum {
  'pause' = 'pause',
  'resume' = 'resume',
  'run' = 'run',
  'stop' = 'stop',
}

export type state = 'pause' | 'resume' | 'run' | 'stop';

const state: Ref<state> = ref(stateEnum.stop);
const countdownRef = ref<CountdownInst | null>();

export function controlModule() {
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
          style: 'display: inline-block; font-size: 4rem; font-weight: bold',
        },
        minutes
      ),
      ':',
      h(
        'span',
        {
          style: 'display: inline-block; font-size: 4rem; font-weight: bold',
        },
        seconds
      ),
    ];
  };

  const isActivated = computed(() => state.value === stateEnum.run);

  const isPaused = computed(() => state.value === stateEnum.pause);

  const isResumed = computed(() => state.value === stateEnum.resume);

  const isStopped = computed(() => state.value === stateEnum.stop);

  function setState(value: state, programId: number | undefined) {
    if (programId === undefined) return;
    BaseActionService.get(
      API_URL.SET_STATE_BY_ID(value, programId),
      {},
      undefined,
      'Ошибка при установке статуса'
    ).then(() => {
      state.value = value;
      if (state.value === stateEnum.stop) {
        handleReset();
      }
    });
  }

  function setStateWebsocket(value: state) {
    state.value = value;
  }

  function handleReset() {
    countdownRef.value?.reset();
  }

  return {
    state,
    setState,
    isActivated,
    isPaused,
    isResumed,
    isStopped,
    stateEnum,
    renderCountdown,
    handleReset,
    countdown: countdownRef,
    setStateWebsocket,
  };
}

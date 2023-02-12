import type { Ref } from 'vue';
import { computed, h, ref } from 'vue';
import type { CountdownInst, CountdownProps } from 'naive-ui';
import axios from 'axios';
import { BASE_API } from '@/base/base-api';

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

  const isActive = computed(
    () => state.value === stateEnum.run || state.value === stateEnum.pause
  );

  const isPause = computed(() => state.value === stateEnum.pause);

  function setState(value: state, programId: string) {
    axios.get(BASE_API + `program/${value}/${programId}`).then(() => {
      state.value = value;
      if (state.value === stateEnum.stop) {
        handleReset();
      }
    });
  }

  function handleReset() {
    countdownRef.value?.reset();
  }

  return {
    state,
    setState,
    isActive,
    isPause,
    stateEnum,
    renderCountdown,
    handleReset,
    countdown: countdownRef,
  };
}

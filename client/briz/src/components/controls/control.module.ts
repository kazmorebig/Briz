import type { Ref } from 'vue';
import { computed, h, ref } from 'vue';
import type { CountdownInst, CountdownProps } from 'naive-ui';

export enum stateEnum {
  'pause' = 'pause',
  'play' = 'play',
  'stop' = 'stop',
}

export type state = 'pause' | 'play' | 'stop';

export function controlModule() {
  const state: Ref<state> = ref(stateEnum.stop);

  const isActive = computed(
    () => state.value === stateEnum.play || state.value === stateEnum.pause
  );

  const isPause = computed(() => state.value === stateEnum.pause);

  function setState(value: state) {
    state.value = value;
    if (state.value === stateEnum.stop) {
      handleReset();
    }
  }

  const countdownRef = ref<CountdownInst | null>();

  function handleReset() {
    countdownRef.value?.reset();
  }

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

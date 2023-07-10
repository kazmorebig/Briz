<script setup lang="ts">
import { NButton } from 'naive-ui/es/button';
import { NIcon } from 'naive-ui/es/icon';
import { NP, NText } from 'naive-ui/es/typography';
import { NCountdown } from 'naive-ui/es/countdown';

import {
  Pause48Regular,
  Stop20Regular,
  CaretRight20Regular,
} from '@vicons/fluent';
import { controlModule } from '@/components/controls/control.module';
import { programModule } from '@/components/program/program.module';
import { setWebSocket } from '@/service/websocket/websocket.module';

const {
  setState,
  isActivated,
  isStopped,
  isPaused,
  isResumed,
  stateEnum,
  renderCountdown,
  countdown,
} = controlModule();
const { sessionPeriod, activeProgramId } = programModule();

const { elapsedTime } = setWebSocket();
</script>

<template>
  <div class="wrapper-control">
    <n-button
      :disabled="activeProgramId === undefined && (!isActivated || isStopped)"
      class="btn-control"
      :class="isPaused ? 'active' : ''"
      @click="
        setState(isPaused ? stateEnum.resume : stateEnum.pause, activeProgramId)
      "
    >
      <n-icon size="44" color="#ddd" :component="Pause48Regular"> </n-icon>
    </n-button>
    <div class="title-control">
      <n-p type="default">{{ $t('control.title') }}</n-p>
      <n-text :type="isActivated ? 'error' : 'default'" class="timer" depth="3">
        <n-countdown
          ref="countdown"
          :duration="(sessionPeriod - elapsedTime) * 1000"
          :active="false"
          :render="renderCountdown"
        />
      </n-text>
    </div>
    <n-button
      :disabled="activeProgramId === undefined"
      class="btn-control"
      @click="
        setState(
          isActivated || isPaused || isResumed ? stateEnum.stop : stateEnum.run,
          activeProgramId
        )
      "
    >
      <n-icon
        :color="isActivated || isPaused || isResumed ? '#FF4949' : ''"
        :size="isActivated || isPaused || isResumed ? '44' : '60'"
        :component="
          isActivated || isPaused || isResumed
            ? Stop20Regular
            : CaretRight20Regular
        "
      >
      </n-icon>
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/styles/functions';
@import 'src/styles/params.scss';

.timer {
  font-size: rem(64px);
  font-weight: bold;
  @media screen and (min-width: $xs) and (max-width: $sm) {
    font-size: rem(40px);
  }
}

.title-control {
  text-align: center;
}
.wrapper-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: rem(50px) 0;
}

.btn-control {
  width: rem(110px);
  height: rem(110px);
  background: linear-gradient(135deg, #515151 15.17%, #0a0a0a 86.17%);
  box-shadow: -4px -4px 15px #3b3b3b, 7px 7px 15px #121212;
  border-radius: rem(200px);
  border: none !important;
  &.active {
    background: linear-gradient(135deg, #0a0a0a 15.17%, #515151 86.17%);
    box-shadow: -4px -4px 15px #3b3b3b, 7px 7px 15px #121212;
  }
}
</style>

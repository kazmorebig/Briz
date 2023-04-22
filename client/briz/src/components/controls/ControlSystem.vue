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
import { setWebSocket } from '@/components/program/websocket.module';

const { setState, isActive, stateEnum, isPause, renderCountdown, countdown } =
  controlModule();
const { sessionPeriod, activeProgramId } = programModule();

const { websocketData, elapsedTime } = setWebSocket();
</script>

<template>
  <div class="wrapper-control">
    <n-button
      :disabled="activeProgramId === undefined && !isActive"
      class="btn-control"
      :class="isPause ? 'active' : ''"
      @click="
        setState(isPause ? stateEnum.resume : stateEnum.pause, activeProgramId)
      "
    >
      <n-icon size="44" color="#ddd" :component="Pause48Regular"> </n-icon>
    </n-button>
    <div class="title-control">
      <n-p type="default">{{ $t('control.title') }}</n-p>
      <n-text
        :type="isActive ? 'error' : 'default'"
        style="font-size: 4rem; font-weight: bold"
        depth="3"
      >
        <n-countdown
          ref="countdown"
          :duration="(sessionPeriod - elapsedTime) * 1000"
          :active="isActive && !isPause"
          :render="renderCountdown"
        />
      </n-text>
    </div>
    <n-button
      :disabled="activeProgramId === undefined"
      class="btn-control"
      @click="
        setState(isActive ? stateEnum.stop : stateEnum.run, activeProgramId)
      "
    >
      <n-icon
        :color="isActive ? '#FF4949' : ''"
        :size="isActive ? '44' : '60'"
        :component="isActive ? Stop20Regular : CaretRight20Regular"
      >
      </n-icon>
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
.title-control {
  text-align: center;
}
.wrapper-control {
  display: flex;
  height: 120px;
  width: 596px;
  justify-content: space-between;
  align-items: center;
  margin: 3.5rem 0;
}
.btn-control {
  width: 110px;
  height: 110px;
  background: linear-gradient(135deg, #515151 15.17%, #0a0a0a 86.17%);
  box-shadow: -4px -4px 15px #3b3b3b, 7px 7px 15px #121212;
  border-radius: 200px;
  border: none !important;
  &.active {
    background: linear-gradient(135deg, #0a0a0a 15.17%, #515151 86.17%);
    box-shadow: -4px -4px 15px #3b3b3b, 7px 7px 15px #121212;
  }
}
</style>

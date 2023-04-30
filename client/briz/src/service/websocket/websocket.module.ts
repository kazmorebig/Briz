import { BASE_URL_WEBSOCKET } from '@/base/base-api';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { WebsocketData } from '@/service/websocket/websocket.type';
import {
  controlModule,
  type state,
} from '@/components/controls/control.module';
import { ProgramState } from '@/service/websocket/websocket.type';
import { programModule } from '@/components/program/program.module';

const websocketData: Ref<WebsocketData | undefined> = ref();
const elapsedTime: Ref<number> = ref(0);
const { setStateWebsocket } = controlModule();
const { setActiveById, isActive } = programModule();

export function setWebSocket() {
  const connection = new WebSocket(BASE_URL_WEBSOCKET + '/status');
  onMounted(() => {
    connection.onmessage = function (e) {
      websocketData.value = JSON.parse(e.data) as WebsocketData;
      elapsedTime.value = (JSON.parse(e.data) as WebsocketData).elapsed_time;
      setStateWebsocket(
        ProgramState[websocketData.value?.program_status] as unknown as state
      );
      setActiveById(websocketData.value?.program_id);
      isActive(websocketData.value?.program_id);
    };
  });

  return {
    websocketData,
    elapsedTime,
  };
}

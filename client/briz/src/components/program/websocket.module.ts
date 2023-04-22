import { BASE_URL_WEBSOCKET } from '@/base/base-api';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { WebsocketData } from '@/components/program/websocket.type';

const websocketData: Ref<WebsocketData | undefined> = ref();
const elapsedTime: Ref<number> = ref(0);

export function setWebSocket() {
  const connection = new WebSocket(BASE_URL_WEBSOCKET + '/status');
  onMounted(() => {
    console.log(connection);
    connection.onmessage = function (e) {
      websocketData.value = JSON.parse(e.data) as WebsocketData;
      elapsedTime.value = (JSON.parse(e.data) as WebsocketData).elapsed_time;
      console.log(websocketData.value, elapsedTime.value, e);
    };
  });

  return {
    websocketData,
    elapsedTime,
  };
}

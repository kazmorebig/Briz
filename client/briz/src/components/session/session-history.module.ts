import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { SessionHistory } from '@/components/session/session.type';
import useFetch from '@/base/base-data.service';
import { API_URL } from '@/base/api-url';
import { plainToClass } from 'class-transformer';

const sessionHistory: Ref<SessionHistory[] | null> = ref(null);
const fetchedHistory: Ref<SessionHistory[] | null> = ref(null);
const sessionCount: Ref<number> = ref(0);
const range: Ref<[number, number] | undefined> = ref();
export function sessionHistoryModule() {
  async function fetchHistory() {
    const { data } = await useFetch<SessionHistory[]>(API_URL.SESSIONS);
    sessionHistory.value =
      (plainToClass(
        SessionHistory,
        data.value
      ) as unknown as SessionHistory[]) || [];
    fetchedHistory.value = sessionHistory.value;
    sessionCount.value = sessionHistory.value?.length;
  }

  onMounted(async () => {
    await fetchHistory();
  });

  watch(range, (newValue: [number, number] | undefined) => {
    if (newValue && newValue[0] && newValue[1]) {
      const start = newValue[0];
      const end = newValue[1];
      sessionHistory.value =
        sessionHistory.value?.filter((item) => {
          return (
            1000 * parseInt(item.start) >= start &&
            1000 * parseInt(item.end) <= end
          );
        }) ?? [];
    } else {
      sessionHistory.value = fetchedHistory.value;
    }
  });

  return {
    sessionHistory,
    sessionCount,
    range,
  };
}

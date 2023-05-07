<script setup lang="ts">
import { sessionHistoryModule } from '@/components/session/session-history.module';
import DataTable from '@/components/table/DataTable.vue';
import { dataTableModule } from '@/components/table/data-table.module';
import BackButton from '@/components/back/BackButton.vue';
import { NDatePicker } from 'naive-ui';
const { sessionHistory, sessionCount, range } = sessionHistoryModule();
const { columns, pagination } = dataTableModule();
</script>

<template>
  <div class="title">
    <h2>
      {{ $t('session.title') }} <sub>{{ sessionCount }}</sub>
    </h2>
    <div>
      <n-date-picker
        :size="'small'"
        :first-day-of-week="0"
        v-model:value="range"
        type="daterange"
        clearable
        start-placeholder="Начало"
        end-placeholder="Конец"
      />
    </div>
  </div>
  <data-table
    v-if="sessionHistory && sessionHistory.length"
    :data="sessionHistory"
    :columns="columns"
    :pagination="pagination"
  >
  </data-table>
  <back-button :link="'/'"></back-button>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 1rem;
  sub {
    color: var(--vt-c-grey);
  }
  display: flex;
  justify-content: space-between;
}
</style>

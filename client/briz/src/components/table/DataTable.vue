<script setup lang="ts">
import type { PaginationProps } from 'naive-ui';
import { NDataTable } from 'naive-ui';
import type { TableColumns } from 'naive-ui/es/data-table/src/interface';
const props = defineProps<{
  data: any;
  columns: TableColumns<any>;
  pagination: PaginationProps;
}>();
</script>

<template>
  <n-data-table
    ref="table"
    :columns="props.columns"
    :data="props.data"
    :pagination="props.pagination"
    :pagination-behavior-on-filter="'first'"
    striped
  />
</template>

<style lang="scss">
.n-data-table .n-data-table__pagination {
  justify-content: flex-start !important;
}
</style>

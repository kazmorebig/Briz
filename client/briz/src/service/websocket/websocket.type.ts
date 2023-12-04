import { stateEnum } from '@/components/controls/control.module';

export interface WebsocketData {
  program_status: ProgramStatus;
  program_id: string;
  elapsed_time: number;
  current_power: number;
  admin: boolean;
}

export type ProgramStatus = 'paused' | 'stopped' | 'running';

export enum ProgramState {
  'paused' = stateEnum.pause,
  'stopped' = stateEnum.stop,
  'running' = stateEnum.run,
}

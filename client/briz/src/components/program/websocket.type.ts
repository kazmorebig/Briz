export interface WebsocketData {
  program_status: ProgramStatus;
  program_id: number;
  elapsed_time: number;
  current_power: number;
}

export type ProgramStatus = 'paused' | 'stopped' | 'running';

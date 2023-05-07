export interface Program {
  id: number;
  name: string;
  description: string;
  actions: Action[];
}

export interface Action {
  type: number;
  duration: number;
  value: string;
}

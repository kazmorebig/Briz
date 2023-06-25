export interface IProgram {
  id: number | null;
  name: string;
  description: string;
  actions: IAction[];
}

export interface IAction {
  type: number;
  duration: number;
  value: number;
}

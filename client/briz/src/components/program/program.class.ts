import type { IProgram } from '@/components/program/program.type';
import { Type } from 'class-transformer';
import { Action } from '@/components/program/action.class';

export class Program implements IProgram {
  @Type(() => Action)
  actions: Action[];

  constructor(
    public description: string,
    public id: string | null,
    public name: string,
    actions: Action[]
  ) {
    this.actions = actions;
  }

  addAction(action: Action) {
    this.actions.push(action);
  }

  deleteAction(index: number) {
    if (index > -1) {
      this.actions.splice(index, 1);
    }
  }

  get fullPeriod(): number {
    return this.actions
      .map((action) => action.duration)
      .reduce((a, b) => a + b, 0);
  }
}

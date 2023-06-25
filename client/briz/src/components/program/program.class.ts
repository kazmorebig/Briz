import type { IProgram } from '@/components/program/program.type';
import { Type } from 'class-transformer';
import { Action } from '@/components/program/action.class';

export class Program implements IProgram {
  @Type(() => Action)
  actions: Action[];

  constructor(
    public description: string,
    public id: number | null,
    public name: string,
    actions: Action[]
  ) {
    this.actions = actions;
  }
}

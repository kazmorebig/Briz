import type { IAction } from '@/components/program/program.type';

export class Action implements IAction {
  constructor(
    public duration: number,
    public type: number,
    public value: number
  ) {}
}

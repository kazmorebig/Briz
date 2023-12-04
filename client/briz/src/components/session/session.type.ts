import { Expose } from 'class-transformer';
import { format } from 'date-fns';

export interface ISessionHistory {
  start: string;
  end: string;
  program: string;
  starter_mac: string;
}

export class SessionHistory implements ISessionHistory {
  program: string;
  start: string;
  end: string;
  starter_mac: string;

  constructor(
    start: string,
    end: string,
    program: string,
    starter_mac: string
  ) {
    this.program = program;
    this.start = start;
    this.end = end;
    this.starter_mac = starter_mac;
  }

  @Expose()
  get date(): string {
    return format(new Date(1000 * parseInt(this.start)), 'dd.LL.yyyy');
  }

  @Expose()
  get startDate(): string {
    return format(new Date(1000 * parseInt(this.start)), 'H:mm:ss');
  }

  @Expose()
  get endDate(): string {
    return format(new Date(1000 * parseInt(this.end)), 'H:mm:ss');
  }

  @Expose()
  get mac(): string {
    return this.starter_mac;
  }
}

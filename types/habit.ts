export interface dayOfWeek {
  dayOfWeek: number;
}

export interface dayOfMonth {
  dayOfMonth: number;
}

export interface details {
  color: string;
  endTime: string | null;
  icon: string;
  id?: string;
  periodCount: number;
  periodType: number;
  startTime: string | null;
  daysOfWeeks?: dayOfWeek[];
  daysOfMonthly?: dayOfMonth[];
}

export interface IHabit {
  creationTime: Date;
  description: string;
  details: details;
  id: string;
  isReminder: boolean;
  name: string;
  status: number;
}

export interface IHabitActionListData {
  date: string;
  habits: IHabit[];
}

export interface IHabitCreate {
  name: string;
  description: string;
  isReminder: boolean;
  details: details;
}

export interface IHabitUpdate {
  id: string;
  name: string;
  description: string;
  isReminder: boolean;
  details: details;
}

export interface IHabitUpdateAction {
  id: string;
  statusEnum: number;
}

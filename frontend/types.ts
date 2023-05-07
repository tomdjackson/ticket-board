export enum Status {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE',
}

export type TicketType = {
  _id: string;
  name: string;
  description: string;
  status: Status;
  visible: boolean;
};

export type BoardType = {
  _id: string;
  name: string;
  tickets?: TicketType[];
};

export type UserType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  boards?: BoardType[],
};

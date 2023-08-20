import { User } from "./user";

type Appointment = {
  id: number;
  title: string;
  sub_title: string;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
  code: string;
  status: "진행중" | "완료";
  deadline: Date;
  duration_minutes: number;
  created_at: Date;
  groupCode: string;
  host_id: number;
  isHost?: boolean;
};

type createAppointmentRequest = Pick<
  Appointment,
  | "title"
  | "sub_title"
  | "start_date"
  | "end_date"
  | "start_time"
  | "end_time"
  | "deadline"
  | "duration_minutes"
  | "groupCode"
>;

type deleteAppointmentRequest = Appointment["code"];
type deleteAppointmentResponse = { message: string };

type updateAppointmentStatusRequest = {
  code: Appointment["code"];
  status: Appointment["status"];
};

type createAppointmentTimeVoteRequest = {
  code: Appointment["code"];
  pickTimes: { [key: string]: string[] };
};

interface AppointmentTimeVote {
  id: number;
  date: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
  appointemntId: number;
  userId: number;
}

type createAppointmentTimeVoteResponse = {
  message?: string;
  appointmentTimeVote?: AppointmentTimeVote;
};

type AppointmentTimeVotesRankingResponse = {
  date: string;
  count: number;
  users: Exclude<User, "email">[];
}[];

export type {
  Appointment,
  AppointmentTimeVote,
  createAppointmentRequest,
  deleteAppointmentRequest,
  deleteAppointmentResponse,
  updateAppointmentStatusRequest,
  createAppointmentTimeVoteRequest,
  createAppointmentTimeVoteResponse,
  AppointmentTimeVotesRankingResponse,
};

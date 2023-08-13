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
  group_code: string;
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
  | "group_code"
>;
export type { Appointment, createAppointmentRequest };

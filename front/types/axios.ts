import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type ErrorResponse = AxiosError<{ message: string }, any> | Error;

export type UseCustomMutationOptions<TData = unknown> = UseMutationOptions<
  TData,
  ErrorResponse,
  unknown
>;

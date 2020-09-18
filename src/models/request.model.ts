import { URLSearchParams } from "url";

export interface RequestModel {
  method: string;
  body: URLSearchParams;
  rediect?: string;
}

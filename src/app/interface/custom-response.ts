import {Question} from "./question";

export interface CustomResponse {
  timeStamp: Date;
  statusCode: number;
  status: string;
  reason: string;
  message: string;
  developerMessage: string;
  data: { questions?: Question[] | null, question?: Question, subtopics?: string[] };
}

import {CorrectOption} from "../enums/correct-option";

export interface Question {
  question: string;
  correctOptionIndex : CorrectOption;
  options : string[];
}

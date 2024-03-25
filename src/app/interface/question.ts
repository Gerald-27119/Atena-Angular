import {Topic} from "../enums/topic.enum";
import {Difficulty} from "../enums/difficulty.enum";

export interface Question {
  id: number;
  question: string;
  topic: Topic;
  difficulty: Difficulty;
  answer: string;
  imageUrl: string;
}

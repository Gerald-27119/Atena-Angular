import {Component, OnInit} from '@angular/core';
import {QuestionService} from "./service/question.service";
import {Observable, of} from "rxjs";
import {CustomResponse} from "./interface/custom-response";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  topics = ['Java', 'CSS']; // Replace this with your actual topics
  subtopicsForGivenTopic$: Observable<CustomResponse> = of({} as CustomResponse);
  questionsForSubtopics$: Observable<CustomResponse>= of({} as CustomResponse);
  selectedTopic: string;

  constructor(private questionService: QuestionService) {
    this.selectedTopic = this.topics[0];
  }
  ngOnInit(): void {
    this.selectTopic(this.topics[0]);
  }
  selectTopic(topic: string): void {
    this.selectedTopic = topic;
    this.subtopicsForGivenTopic$ = this.questionService.getSubtopicsForTopic$(topic);
    this.subtopicsForGivenTopic$.subscribe(response => {
      if (response.data.subtopics && response.data.subtopics.length > 0) {
        this.selectSubtopic(this.selectedTopic, response.data.subtopics[0]);
      }
    });
  }

  selectSubtopic(topic: string, subtopic: string): void {
    this.questionsForSubtopics$ = this.questionService.getQuestionsForSubtopic$(topic, subtopic);
  }
}


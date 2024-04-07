import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {CustomResponse} from "../interface/custom-response";
import {QuestionService} from "../service/question.service";
import {Topic} from "../enums/topic.enum";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  @Input() selectedTopic!: Observable<Topic>;
  selectedTopicSubscription!: Subscription;
  questionsForTopic$: Observable<CustomResponse> = of({} as CustomResponse);
  currentQuestionIndex = 0;
  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.selectedTopicSubscription = this.selectedTopic.subscribe(topic => {
      console.log(`Selected topic in quiz.component changed to: ${topic}`);
      this.fetchQuestionsForTopic(topic);
    });
  }

  ngOnDestroy(): void {
    if (this.selectedTopicSubscription) {
      this.selectedTopicSubscription.unsubscribe();
    }
  }

  fetchQuestionsForTopic(topic: Topic): void {
    this.questionsForTopic$ = this.questionService.getQuestionsForTopic$(topic);
  }

}

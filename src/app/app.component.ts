import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from "./enums/topic.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTopic = new BehaviorSubject<Topic>(Topic.JAVA);
  protected readonly Topic = Topic;

  onTopicSelected(topic: Topic): void {
    console.log(`Selected topic in app.component changed to: ${topic}`)
    this.selectedTopic.next(topic);
  }

  getSelectedTopic(): Observable<Topic> {
    return this.selectedTopic.asObservable();
  }
}

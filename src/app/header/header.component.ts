import {Component, EventEmitter, Output} from '@angular/core';
import {Topic} from "../enums/topic.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() topicSelected = new EventEmitter<Topic>();
  topics = Object.values(Topic);


  selectTopic(topic: Topic): void {
    this.topicSelected.emit(topic);
  }

  protected readonly Topic = Topic;
}

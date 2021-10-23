import { Component, OnInit, Input } from '@angular/core';
import { Animations } from "../animations/animations";
import { Utils } from "../utils";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    Animations.answer,
    Animations.slideInOut
  ]
})
export class CardComponent implements OnInit {
  @Input() cardMessage: String;
  @Input() answerState: String;
  @Input() movementState: String;

  constructor() { }

  ngOnInit() {
    this.answerState = Utils.STATE_ANSWER_NORMAL;
  }

  @Input() public setAnswerState(answerState: string) {
    this.answerState = answerState;
  }

}

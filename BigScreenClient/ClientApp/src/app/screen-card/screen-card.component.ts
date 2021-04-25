import { Component, Input, OnInit } from '@angular/core';
import { SignalRService } from "../services/signal-r.service";
import { NavigationService } from "../services/navigation.service";
import { Utils } from "../utils";

@Component({
  selector: 'app-screen-card',
  templateUrl: './screen-card.component.html',
  styleUrls: ['./screen-card.component.css']
})
export class ScreenCardComponent implements OnInit {
  
  public groupName: string;

  constructor(public nav: NavigationService, public signalRService: SignalRService) {
    this.signalRService.startConnection(() => {this.init()});
   }

  public currentCount = 0;
  public card1Message = "Welcome!";
  public card2Message = "2";  

  public card1State = Utils.STATE_TRANSITION_ON;
  public card2State = Utils.STATE_TRANSITION_OFF;
  public card1AnswerState = Utils.STATE_ANSWER_NORMAL;
  public card2AnswerState = Utils.STATE_ANSWER_NORMAL;

  
  ngOnInit() {
    this.groupName = this.nav.groupName
  }

  private init() {
    this.signalRService.subscribeToAnswer((answer, message) => this.toggle(answer, message));
    this.signalRService.subscribeToReceiveMessage((message) => this.setHost(message))
    this.signalRService.addToGroup(this.groupName);
  }

  private setHost(message: string) {
    this.toggle(Utils.STATE_ANSWER_NORMAL, message);
  }

  private toggle(answer: string, message: string) {
    this.setAnswerState(answer);
    this.resetOldAnswerState();

    switch (this.card1State) {
      case Utils.STATE_TRANSITION_ON: 
          this.card1State = Utils.STATE_TRANSITION_OFF;
          this.card2State = Utils.STATE_TRANSITION_ON;
          this.card2Message = message;
        break;

      case Utils.STATE_TRANSITION_OFF:
        this.card1State = Utils.STATE_TRANSITION_ON;
        this.card1Message = message;
        this.card2State = Utils.STATE_TRANSITION_OFF;
        break;

      default:
        break;
    }
  }

  private resetOldAnswerState() {
    if(this.card1State === Utils.STATE_TRANSITION_ON) {
      this.card2AnswerState = Utils.STATE_ANSWER_NORMAL;
    } else {
      this.card1AnswerState = Utils.STATE_ANSWER_NORMAL;
    }
  }
 
  private setAnswerState(anwserState: string) {
    if(this.card1State === Utils.STATE_TRANSITION_ON) {
      this.card1AnswerState = anwserState;
    } else {
      this.card2AnswerState = anwserState;
    }
  }
}
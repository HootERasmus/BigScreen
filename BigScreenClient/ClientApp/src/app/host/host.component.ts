import { Component, OnInit } from '@angular/core';
import { SignalRService } from "../services/signal-r.service";
import { ApiService, GetInfo } from "../services/api.service";
import { NavigationService } from "../services/navigation.service";
import { Utils } from "../utils";
import { timeStamp } from 'console';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  constructor(public nav: NavigationService, public signalRService: SignalRService, public api: ApiService) {
    this.nav.groupName = this.groupName = Utils.pad(Math.floor(Math.random() * 100000).toString(), 5, undefined);
    this.signalRService.startConnection(() => { this.init(); });
  }

  private gameInfo: GetInfo;
  private nextWordIndex: number;
  public groupName: string;

  ngOnInit() {
    this.nextWordIndex = 0;
  }

  private init() {
    this.signalRService.subscribeToNewUser((userId) => this.newUser(userId))
  }

  private newUser(userId: string) {
    this.signalRService.sendToUser(this.groupName, userId, this.gameInfo.words[this.nextWordIndex - 1]);
  }

  public pass() {
    this.sendToGroup(this.groupName, Utils.STATE_ANSWER_PASS, this.gameInfo.words[this.nextWordIndex]);    
  }

  public async next() {
    this.sendToGroup(this.groupName, Utils.STATE_ANSWER_NORMAL, this.gameInfo.words[this.nextWordIndex]);
  }

  public async reset() {
    this.gameInfo = await this.api.createGame(3);
    this.nextWordIndex = 0;
    await this.next();
  }

  public correct() {
    this.sendToGroup(this.groupName, Utils.STATE_ANSWER_CORRECT, this.gameInfo.words[this.nextWordIndex]);
  }

  public sendToGroup(groupName: string, answer: string, nextWord: string) {
    if(this.nextWordIndex < this.gameInfo.words.length) {
      this.signalRService.SendToGroup(groupName, answer, nextWord)
      this.nextWordIndex++;
    }
  }

}

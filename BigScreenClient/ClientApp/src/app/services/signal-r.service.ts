import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

public Message: string;
public connectionId : string;

constructor() {}

private hubConnection: signalR.HubConnection
  public startConnection(func) {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://192.168.0.6:5000/chathub')
                            .build();
    this.hubConnection
      .start()
      .then(() => {console.log('Connection started'); func(); this.getConnectionId();})
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public subscribeToReceiveMessage = (func) => {
    this.hubConnection.on('ReceiveMessage', (connectionId, message) => {
      if(this.connectionId === connectionId) {
        func(message);
      }
    });
  }

  public subscribeToAnswer = (func) => {
    this.hubConnection.on('Answer', (answer, message) => {
      func(answer, message);
    });
  }

  public subscribeToNewUser(func) {
    this.hubConnection.on('NewUser', (userId) => {
      func(userId);
    });
  }

  public getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid').then(
      (data) => {
        console.log(data);
          this.connectionId = data;
        }
    ); 
  }

  public addToGroup = async (groupName: string) => {
    return await this.hubConnection.invoke("AddToGroup", groupName);
  }

  public async sendToUser (groupName: string, user: string, message: string) {
    return await this.hubConnection.invoke("SendToUser", groupName, user, message);
  }

  public async SendToGroup (groupName: string, anwser: string, message: string) {
    return await this.hubConnection.invoke("SendToGroup", groupName, anwser, message);
  }
}

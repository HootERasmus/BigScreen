import http, {baseChat} from "./http-common";
import * as signalR from '@microsoft/signalr';

class SignalRService {
  private _hubConnection?: signalR.HubConnection
  public message?: string;
  public connectionId?: string;

  startConnection(func: () => void) {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(baseChat)
      .withAutomaticReconnect()
      .build();

    this._hubConnection
      .start()
      .then(() => {console.log('Connection started'); func(); this.getConnectionId();})
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  subscribeToReceiveMessage(func: (message:string) => void) {
    this._hubConnection?.on('ReceiveMessage', (connectionId, message) => {
      if(this.connectionId === connectionId) {
        func(message);
      }
    });
  }
    
  subscribeToAnswer(func: (anwser: string, message: string) => void) {
    this._hubConnection?.on('Answer', (answer, message) => {
      func(answer, message);
    });
  }
    
  subscribeToNewUser(func: (userId: string) => void) {
    this._hubConnection?.on('NewUser', (userId) => {
      func(userId);
    });
  }
    
  getConnectionId() {
    this._hubConnection?.invoke('getconnectionid').then(
      (data) => {
        console.log(data);
          this.connectionId = data;
        }
    ); 
  }

  async addToGroup(groupName: string) {
    return await this._hubConnection?.invoke("AddToGroup", groupName);
  }

  async sendToUser(groupName: string, user: string, message: string) {
    return await this._hubConnection?.invoke("SendToUser", groupName, user, message);
  }

  async SendToGroup (groupName: string, anwser: string, message: string) {
    return await this._hubConnection?.invoke("SendToGroup", groupName, anwser, message);
  }
}

export default SignalRService;
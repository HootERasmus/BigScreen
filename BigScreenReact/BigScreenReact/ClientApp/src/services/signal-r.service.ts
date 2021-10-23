import http, {baseChat} from "./http-common";
import * as signalR from '@microsoft/signalr';

const SignalRService = {
    hubConnection: signalR.HubConnection,

    startConneciton(func) {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(baseChat)
        .build();

    this.hubConnection
      .start()
      .then(() => {console.log('Connection started'); func(); this.getConnectionId();})
      .catch(err => console.log('Error while starting connection: ' + err));
    },

    subscribeToReceiveMessage(func) {
        this.hubConnection.on('ReceiveMessage', (connectionId, message) => {
          if(this.connectionId === connectionId) {
            func(message);
          }
        });
      },
    
      subscribeToAnswer(func) {
        this.hubConnection.on('Answer', (answer, message) => {
          func(answer, message);
        });
      },
    
      subscribeToNewUser(func) {
        this.hubConnection.on('NewUser', (userId) => {
          func(userId);
        });
      },
    
      getConnectionId() {
        this.hubConnection.invoke('getconnectionid').then(
          (data) => {
            console.log(data);
              this.connectionId = data;
            }
        ); 
      },
    
      async addToGroup(groupName: string) {
        return await this.hubConnection.invoke("AddToGroup", groupName);
      },
    
      async sendToUser(groupName: string, user: string, message: string) {
        return await this.hubConnection.invoke("SendToUser", groupName, user, message);
      },
    
      async SendToGroup (groupName: string, anwser: string, message: string) {
        return await this.hubConnection.invoke("SendToGroup", groupName, anwser, message);
      }
}

export default SignalRService;
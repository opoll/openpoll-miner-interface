import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class EventService {

  // Values observers can subscribe to in whatever
  // component service is pulled into
  messages: Subject<any>;

  constructor(private wsService: WebSocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any =>{
        return response;
      })
  }

  // Test send message to server
  sendMessage(msg){
    this.messages.next(msg);
  }

}

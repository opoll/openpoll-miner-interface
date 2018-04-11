import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class EventService {

  // Values observers can subscribe to in whatever
  // component service is pulled into
  eventData: Subject<any>;

  constructor(private wsService: WebSocketService) {
    this.eventData = <Subject<any>>wsService
      .connect()
      .map((response: any): any =>{
        return response;
      });
  }

}

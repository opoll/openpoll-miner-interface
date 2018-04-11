import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'; // Import socket.io client library
import { Observable } from 'rxjs/observable';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebSocketService {

  private socket; // socket that will connect to mining application which runs socket.io

  constructor() { }

  connect(): Rx.Subject<MessageEvent>{

      this.socket = io('http://localhost:9011'); // Set connection on localhost port 80

      let observable = new Observable(observer => {
        // Everytime our socket gets an event, we will want to
        // pass data from event on
        this.socket.on('message', (data) => {
          observer.next(data);
        });

        // Fire self-invoking anonymous function to clean up connection
        return () => {
          this.socket.disconnect();
        }
      });

    let observer = {
      // handle data when next() is invoked during data broadcast
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    };

    // Construct the observer and observable
    return Rx.Subject.create(observer, observable);
  }
}

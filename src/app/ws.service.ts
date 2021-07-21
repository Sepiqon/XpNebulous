import { Injectable } from '@angular/core';
import { Ws } from './model/Ws';
import Pusher, { AuthorizerCallback } from 'pusher-js';
import { ChatComponent, ResponseReq } from './chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  context = {};
  constructor() {
    this.pusher = new Pusher("da37d9a35767b2fde1b7"
      , { cluster: "eu" });
    //Pusher.logToConsole=true;
  }
  pusher: Pusher;
  async send(model: any, event: string, channel: string, com: ChatComponent) {
    let ws: Ws = new Ws();;
    ws.c = channel;
    ws.e = event;
    ws.b = model;
    var that = com;
    return await that.createXHR_1_2("POST", "ws", ws, undefined, false, (res: ResponseReq) => {
    }, (res: ResponseReq) => {
    });
  }
  connect(channnel: string, event: string, callback: Function) {
    var channel = this.pusher.subscribe(channnel);
    channel.bind(event, callback, this.context);
  }

}

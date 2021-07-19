import { Injectable } from '@angular/core';
import { Ws } from './model/Ws';
import Pusher, { AuthorizerCallback } from 'pusher-js';
import { ChatComponent } from './chat/chat.component';

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
  send(model: any, event: string, channel: string, com: ChatComponent) {
    let ws: Ws = new Ws();;
    ws.c = channel;
    ws.e = event;
    ws.b = model;
    var that = com;

    that.createXHR("POST", "ws", ws, async (req: any) => {
      if ((req.target as XMLHttpRequest).readyState === 4) {
        var response = JSON.parse((req.target as XMLHttpRequest).responseText);
        if ((req.target as XMLHttpRequest).status === 200) {
        } else {
          that.show(JSON.parse((req.target as XMLHttpRequest).responseText), true);
        }
      }

    }, undefined, false);
  }
  connect(channnel: string, event: string, callback: Function) {
    var channel = this.pusher.subscribe(channnel);
    channel.bind(event, callback, this.context);
  }

}

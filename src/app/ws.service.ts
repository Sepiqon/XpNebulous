import { Injectable } from '@angular/core';
import { Ws } from './model/Ws';
import Pusher, { AuthorizerCallback } from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() {
     this.pusher = new Pusher("da37d9a35767b2fde1b7"
    ,{cluster: "eu"});
  }
  pusher:Pusher;
  send(model:any,event:string,channel:string){
    let ws:Ws=new Ws();;
    ws.c=channel;
    ws.e=event;
    ws.b=model;
    var xhrr = new XMLHttpRequest();
    xhrr.withCredentials = true;
    xhrr.addEventListener("readystatechange", function() {});
    xhrr.open("POST", "https://proxy-sepiqon.herokuapp.com/ws",true);
    xhrr.withCredentials = false;
    xhrr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrr.send(JSON.stringify(ws));
  }
  connect(c:string,){
   var channel = this.pusher.subscribe(c);
  }
}

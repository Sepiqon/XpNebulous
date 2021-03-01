import { Injectable } from '@angular/core';
import { Ws } from './model/Ws';
import Pusher, { AuthorizerCallback } from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  context={};
  constructor() {
     this.pusher = new Pusher("da37d9a35767b2fde1b7"
    ,{cluster: "eu"});
    //Pusher.logToConsole=true;
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
    if(localStorage.getItem('token')){
      xhrr.setRequestHeader("x-access-token", localStorage.getItem('token') as string );
    }
    xhrr.send(JSON.stringify(ws));
  }
  connect(channnel:string,event:string,callback:Function){
   var channel = this.pusher.subscribe(channnel);
   channel.bind(event, callback, this.context);
  }

}

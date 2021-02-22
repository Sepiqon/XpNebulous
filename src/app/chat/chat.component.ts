import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Message } from '../model/Message';
import { WsService } from '../ws.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterContentInit {

  constructor(private ws:WsService) { }
  ngAfterContentInit(): void {
    var that=this;
    this.ws.connect("wiadomosci","send",function (data:any) {
      var messagesc:Array<Message>= new Array();
       that.messages.forEach(function name(value:Message) {
         messagesc.push(value);
       });
       messagesc.push(data);
       that.messages=messagesc;
    });
    this.getmessages();
  }
  name:string="";
  name2:string="";
  ngOnInit() {

  }
  messages:Array<Message>= new Array();
  value='';
  send(){
    if(this.value !== ''){
      var model= new Message();
      model.name=this.name;
      model.message=this.value;
      this.ws.send(model,"send","wiadomosci");
    }
    this.value='';

  }
  date(d: Date){
    if(
      d !== undefined &&
      d !== null

    ){
      return new Date(Date.parse(d.toString())).toLocaleString() ;
    } else {
      return '';
    }


  }
  uname(){
    this.name= this.name2;
  }
  getmessages(){
    var xhrr = new XMLHttpRequest();
    xhrr.withCredentials = true;
    xhrr.addEventListener("readystatechange", function() {});
    xhrr.open("GET", "https://proxy-sepiqon.herokuapp.com/getmessages",true);
    xhrr.withCredentials = false;
    xhrr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrr.send();
    var that=this;
    xhrr.onreadystatechange=function() {
      if (xhrr.readyState === 4) {
        var response = JSON.parse(xhrr.responseText);
          if (xhrr.status === 200) {
            console.log('successful');
            (response as Array<any>).forEach(function (value) {
                if(value.name !== undefined){
                  that.messages.push((value as Message));
                }
            });
          } else {
             console.log('failed');
          }
      }
    }

  }
}

import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../model/Message';
import { WsService } from '../ws.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterContentInit,AfterViewInit {

  constructor(private ws:WsService) { }
  ngAfterViewInit(): void {
    var that=this;
    this.ws.connect("wiadomosci","send",async function (data:any) {
      var messagesc:Array<Message>= new Array();
       //that.messages.forEach(function name(value:Message) {
       //  messagesc.push(value);
      // });
      // messagesc.push(data);
      // that.messages=messagesc;
      that.messages.push(data);
      for (let index = 0; index < 1000; index++) {
        //setTimeout(()=>{ that.myScrollVariable += (that.scr.nativeElement.scrollHeight)/1000; },1);

      }

      (async () => {
        console.log('before delay')
        for (let index = 0; index < 1000; index++) {
          await new Promise( resolve => setTimeout(resolve, 333) );
          await new Promise( () => setTimeout(() => { that.myScrollVariable += 1; }, 1) );

        }


        // Do something after
        console.log('after delay')
    })();

    });
    this.getmessages();
  }
  ngAfterContentInit(): void {

  }
  name:string="";
  name2:string="";
  @ViewChild("scr") scr: any;
  myScrollVariable=0;
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
     const that=this;
    xhrr.onreadystatechange= async function() {
      if (xhrr.readyState === 4) {
        var response = JSON.parse(xhrr.responseText);
          if (xhrr.status === 200) {
            console.log('successful');
            (response as Array<any>).forEach(function (value) {
                if(value.name !== undefined){

                  that.messages.push((value as Message));
                  setTimeout(()=>{ that.myScrollVariable =that.scr.nativeElement.scrollHeight; },1)
                  //const s = document.getElementById('scr');
                 // (s as HTMLElement).scrollTop=(s as HTMLElement).scrollHeight;

                }
            });
          } else {
             console.log('failed');
          }
      }
    }


  }
}

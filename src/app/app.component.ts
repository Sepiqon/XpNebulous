import { Player } from './model/Player';
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import Pusher, { AuthorizerCallback } from 'pusher-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NebulousXp';
  xp=0;
  lvl=1;
  lvls=0;
  days=0;
  target=1;
  xpbday=0;
  freezer=500;
  id=6573801;
  test="WyĹ›wietla siÄ™";
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const pusher = new Pusher("da37d9a35767b2fde1b7"
    ,{cluster: "eu"});
    Pusher.logToConsole = true;
   var channel = pusher.subscribe("wiadomosci");
   var callback = function(eventName:any, data:any) {
    alert(`The event ${eventName} was triggered with data ${JSON.stringify(data)}`);
  };

   channel.bind_global(callback);

	}
  test22(){

  }

	ngAfterViewInit(): void {
		// afterViewInit code.
		this.init();
    }

	init(): void {
    this.idCh(this.id);

    //https://proxy-sepiqon.herokuapp.com/ws
    //{"c":"wiadomosci","e":"my-event","b":{"message":"a"}}



  }
  xpCh(xpc: number): number {




    this.xp=xpc;
    this.lvl = Math.floor(Math.sqrt(this.xp/this.freezer))+1;
    var down = Math.pow(this.lvl-1,2)*this.freezer;
    var up = Math.pow(this.lvl,2)*this.freezer;
    this.lvls = Math.floor(((this.xp-down)/(up-down))*10000)/100;
    this.days = Math.floor((Math.pow(this.target-1,2)*this.freezer-this.xp)/this.xpbday)+1
    return this.xp;
  }
  lvlCh(lvlc: number): number {
    this.lvl = lvlc;
    var up=(Math.pow(this.lvl,2)*this.freezer);
    var down = (Math.pow(this.lvl-1,2)*this.freezer);
    this.xp =Math.floor(down + (up-down)*(this.lvls/100));
    this.lvls =Math.floor(((this.xp-down)/(up-down))*10000)/100;
    this.days = Math.floor((Math.pow(this.target-1,2)*this.freezer-this.xp)/this.xpbday)+1
    return this.lvl;
  }
  lvlsCh(lvlsc: number): number {
    this.lvls = lvlsc;
    var up=(Math.pow(this.lvl,2)*this.freezer);
    var down = (Math.pow(this.lvl-1,2)*this.freezer);
    this.xp =Math.floor(down + (up-down)*(this.lvls/100));
    this.lvls =Math.floor(((this.xp-down)/(up-down))*10000)/100;
    this.days = Math.floor((Math.pow(this.target-1,2)*this.freezer-this.xp)/this.xpbday)+1
    return this.lvls;
  }
  xpbdayCh(xpbdayc: number): number {
    this.xpbday = xpbdayc;
    this.days = Math.floor((Math.pow(this.target-1,2)*this.freezer-this.xp)/this.xpbday)+1
    return this.xpbday;
  }
  targetCh(targetc: number): number {
    this.target = targetc;
    this.days = Math.floor((Math.pow(this.target-1,2)*this.freezer-this.xp)/this.xpbday)+1
    return this.target;
  }
  idCh(idc:number){
    this.id = idc;
    var data = "Game=Nebulous&Version=447&AccountId="+this.id;;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var that = this;
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        var d:Player;
        d= JSON.parse(this.responseText);
        that.xpCh(d.XP);
      }
    });

    xhr.open("POST", "https://proxy-sepiqon.herokuapp.com/https://www.simplicialsoftware.com/api/account/GetPlayerStats",true);
    xhr.withCredentials = false;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


    xhr.onreadystatechange = function() { // Call a function when the state changes.

  }
    xhr.send(data);
  }
}

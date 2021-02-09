import { Component } from '@angular/core';
import $ from "jquery";
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


  ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		// afterViewInit code.
		this.init();
    }

	init(): void {
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
}

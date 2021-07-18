import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DynamicFormArrayModel, DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { MY_FORM_MODEL } from '../model/MY_FORM_MODEL';
import { PlayerModel } from '../model/PlayerModel';
import { WsService } from '../ws.service';

@Component({
  selector: 'app-nebulousxp',
  templateUrl: './nebulousxp.component.html',
  styleUrls: ['./nebulousxp.component.css']
})
export class NebulousxpComponent implements OnInit {

  xp = 0;
  lvl = 1;
  lvls = 0;
  days = 0;
  target = 1;
  xpbday = 0;
  freezer = 500;
  id = 6573801;
  test = "WyĹ›wietla siÄ™";


  formModel: DynamicFormModel = MY_FORM_MODEL;
  formGroup: FormGroup = this.formService.createFormGroup(this.formModel);
  formArrayModel = this.formService.findModelById<DynamicFormArrayModel>("myFormArray", this.formModel);
  formArrayControl = this.formService.findControlByModel<FormArray>(this.formArrayModel as DynamicFormArrayModel, this.formGroup);

  addItem() {
    this.formService.addFormArrayGroup(this.formArrayControl as FormArray, this.formArrayModel as DynamicFormArrayModel);
    this.formService.detectChanges();
  }

  clear() {
    this.formService.clearFormArray(this.formArrayControl as FormArray, this.formArrayModel as DynamicFormArrayModel);
    this.formService.detectChanges();
  }


  constructor(private http: HttpClient, private ws: WsService, private formService: DynamicFormService) { }

  ngOnInit(): void {

  }
  test22() {

  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
  }

  init(): void {
    this.idCh(this.id);
  }
  xpCh(xpc: number): number {




    this.xp = xpc;
    this.lvl = Math.floor(Math.sqrt(this.xp / this.freezer)) + 1;
    var down = Math.pow(this.lvl - 1, 2) * this.freezer;
    var up = Math.pow(this.lvl, 2) * this.freezer;
    this.lvls = Math.floor(((this.xp - down) / (up - down)) * 10000) / 100;
    this.days = Math.floor((Math.pow(this.target - 1, 2) * this.freezer - this.xp) / this.xpbday) + 1
    return this.xp;
  }
  lvlCh(lvlc: number): number {
    this.lvl = lvlc;
    var up = (Math.pow(this.lvl, 2) * this.freezer);
    var down = (Math.pow(this.lvl - 1, 2) * this.freezer);
    this.xp = Math.floor(down + (up - down) * (this.lvls / 100));
    this.lvls = Math.floor(((this.xp - down) / (up - down)) * 10000) / 100;
    this.days = Math.floor((Math.pow(this.target - 1, 2) * this.freezer - this.xp) / this.xpbday) + 1
    return this.lvl;
  }
  lvlsCh(lvlsc: number): number {
    this.lvls = lvlsc;
    var up = (Math.pow(this.lvl, 2) * this.freezer);
    var down = (Math.pow(this.lvl - 1, 2) * this.freezer);
    this.xp = Math.floor(down + (up - down) * (this.lvls / 100));
    this.lvls = Math.floor(((this.xp - down) / (up - down)) * 10000) / 100;
    this.days = Math.floor((Math.pow(this.target - 1, 2) * this.freezer - this.xp) / this.xpbday) + 1
    return this.lvls;
  }
  xpbdayCh(xpbdayc: number): number {
    this.xpbday = xpbdayc;
    this.days = Math.floor((Math.pow(this.target - 1, 2) * this.freezer - this.xp) / this.xpbday) + 1
    return this.xpbday;
  }
  targetCh(targetc: number): number {
    this.target = targetc;
    this.days = Math.floor((Math.pow(this.target - 1, 2) * this.freezer - this.xp) / this.xpbday) + 1
    return this.target;
  }
  async idCh(idc: number) {
    this.id = idc;
    var data = "Game=Nebulous&Version=447&AccountId=" + this.id;;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var that = this;
    let d: PlayerModel;
    d = new PlayerModel();




    xhr.addEventListener("readystatechange", async function () {
      if (this.readyState === 4) {

        d = JSON.parse(this.responseText) as PlayerModel;

        that.xpCh(d.XP);
        //that.ws.send({id:d.AccountID, nick: d.AccountName,lvl: that.lvl},"my-event","wiadomosci");
      }
    });
    xhr.open("POST", "https://proxy-sepiqon.herokuapp.com/https://www.simplicialsoftware.com/api/account/GetPlayerStats", true);
    xhr.withCredentials = false;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);


  }

}

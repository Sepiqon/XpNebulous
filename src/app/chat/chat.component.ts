import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Message } from '../model/Message';
import { WsService } from '../ws.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterContentInit, AfterViewInit {

  constructor(private ws: WsService, private modalService: NgbModal, private notificationService: NotificationService) { }
  name = '';
  name2 = '';
  login = new FormGroup({
    "name": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
  });
  register = new FormGroup({
    "name": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
    "email": new FormControl("", [Validators.email, Validators.required]),
  });
  ngAfterViewInit(): void {
    var that = this;
    this.ws.connect("wiadomosci", "send", async function (data: any) {
      var messagesc: Array<Message> = new Array();
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
        // for (let index = 0; index < 1000; index++) {
        //  await new Promise( resolve => setTimeout(resolve, 333) );
        await new Promise(() => setTimeout(() => { that.myScrollVariable = that.scr.nativeElement.scrollHeight; }, 1));

        //  }


        // Do something after
        console.log('after delay')
      })();

    });
    this.getmessages();
  }
  ngAfterContentInit(): void {

  }


  @ViewChild("scr") scr: any;
  myScrollVariable = 0;
  ngOnInit() {
    if (this.logged()) {
      this.getme();
    }
  }
  messages: Array<Message> = new Array();
  value = '';
  closeResult = '';
  send() {
    if (this.value !== '') {
      var model = new Message();
      if (!this.logged()) {
        model.name = this.name;
      }
      model.message = this.value;
      this.ws.send(model, "send", "wiadomosci");
    }
    this.value = '';

  }
  date(d: Date) {
    if (
      d !== undefined &&
      d !== null

    ) {
      return new Date(Date.parse(d.toString())).toLocaleString();
    } else {
      return '';
    }


  }
  uname() {
    this.name = this.name2;
  }
  getmessages() {
    var xhrr = new XMLHttpRequest();
    xhrr.withCredentials = true;
    xhrr.addEventListener("readystatechange", function () { });
    xhrr.open("GET", "https://proxy-sepiqon.herokuapp.com/getmessages", true);
    xhrr.withCredentials = false;
    xhrr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrr.send();
    const that = this;
    xhrr.onreadystatechange = async function () {
      if (xhrr.readyState === 4) {
        var response = JSON.parse(xhrr.responseText);
        if (xhrr.status === 200) {
          console.log('successful');
          (response as Array<any>).forEach(function (value) {
            if (value.name !== undefined) {

              that.messages.push((value as Message));
              setTimeout(() => { that.myScrollVariable = that.scr.nativeElement.scrollHeight; }, 1)
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
  createXHR(method: string, url: string, data: any, fun: (this: XMLHttpRequest, ev: Event) => any, methodFun: string | undefined, refreshToken: string | undefined) {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () { });
    xhr.open(method, "http://localhost:8088/" + url, true);
    //xhr.withCredentials = false;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (methodFun) {
      xhr.setRequestHeader("fun", methodFun);
    }
    if (sessionStorage.getItem("sessionToken")) {
      xhr.setRequestHeader("csrf-token", sessionStorage.getItem("sessionToken") as string);
    }
    if (refreshToken) {
      xhr.send(JSON.stringify({ refreshToken: refreshToken }));
    } else {
      if (data) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    }

    xhr.onreadystatechange = fun;
  }
  openLogin(content: any) {
    var that = this;
    if (!sessionStorage.getItem("sessionToken")) {
      this.getCSFRtoken();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {


      this.createXHR("POST", "login", result.value, async (req: any) => {
        if ((req.target as XMLHttpRequest).readyState === 4) {
          var response = JSON.parse((req.target as XMLHttpRequest).responseText);
          if ((req.target as XMLHttpRequest).status === 200) {

            localStorage.setItem('token', response.token);
            that.notificationService.show({
              content: 'Zalogowano się',
              hideAfter: 3000,
              cssClass: 'button-notification',
              animation: { type: 'fade', duration: 400 },
              position: { horizontal: 'center', vertical: 'bottom' },
              type: { style: 'success', icon: true },
              //closable: true
            });
            this.getme();
          } else {
            this.notificationService.show({
              content: (req.target as XMLHttpRequest).statusText,
              hideAfter: 3000,
              cssClass: 'button-notification',
              animation: { type: 'fade', duration: 400 },
              position: { horizontal: 'center', vertical: 'bottom' },
              type: { style: 'error', icon: true },
              //closable: true
            });
          }
        }

      }, undefined, undefined);


    }, (reason) => {

    });
  }
  getCSFRtoken() {
    this.createXHR("GET", "csfr", undefined, async (req: any) => {
      var res = (req.target as XMLHttpRequest);
      if (res.readyState == 4) {
        var body = JSON.parse(res.responseText);
        if (res.status === 200) {
          this.show(body.message, false);
          sessionStorage.setItem("sessionToken", res.getResponseHeader("csrf-token") as string)
        } else {
          this.show(body.message, true);

        }
      }
      //Access-Control-Expose-Headers: *

    }, undefined, undefined);
  }
  show(s: string, err: boolean) {
    if (err) {
      this.notificationService.show({
        content: s,
        hideAfter: 3000,
        cssClass: 'button-notification',
        animation: { type: 'fade', duration: 400 },
        position: { horizontal: 'center', vertical: 'bottom' },
        type: { style: 'error', icon: true }
      });
    } else {
      this.notificationService.show({
        content: s,
        hideAfter: 3000,
        cssClass: 'button-notification',
        animation: { type: 'fade', duration: 400 },
        position: { horizontal: 'center', vertical: 'bottom' },
        type: { style: 'success', icon: true }
      });
    }
  }
  openRegister(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      var xhrr = new XMLHttpRequest();
      xhrr.withCredentials = true;
      xhrr.addEventListener("readystatechange", function () { });
      xhrr.open("POST", "https://proxy-sepiqon.herokuapp.com/register", true);
      xhrr.withCredentials = false;
      xhrr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      result.value.name = result.value.name.trim();
      xhrr.send(JSON.stringify(result.value));
      const that = this;
      xhrr.onreadystatechange = async function () {
        if (xhrr.readyState === 4) {

          if (xhrr.status === 200) {
            var response = JSON.parse(xhrr.responseText);
            localStorage.setItem('token', response.token);
            that.notificationService.show({
              content: 'Zarejestrowano się i automatycznie zalogowano',
              hideAfter: 3000,
              cssClass: 'button-notification',
              animation: { type: 'fade', duration: 400 },
              position: { horizontal: 'center', vertical: 'bottom' },
              type: { style: 'success', icon: true },
              //closable: true
            });
            that.getme();
          } else {
            that.notificationService.show({
              content: JSON.parse(xhrr.responseText).message,
              hideAfter: 3000,
              cssClass: 'button-notification',
              animation: { type: 'fade', duration: 400 },
              position: { horizontal: 'center', vertical: 'bottom' },
              type: { style: 'error', icon: true },
              //closable: true
            });
          }
        }
      }


    }, (reason) => {

    });
  }
  logged() {
    if (!localStorage.getItem('token')) {
      return false;
    } else {
      return true;
    }
  }
  getme() {
    var xhrr = new XMLHttpRequest();
    xhrr.withCredentials = true;
    xhrr.addEventListener("readystatechange", function () { });
    xhrr.open("GET", "https://proxy-sepiqon.herokuapp.com/getme", true);
    xhrr.withCredentials = false;
    xhrr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrr.setRequestHeader("x-access-token", localStorage.getItem('token') as string);
    xhrr.send();
    const that = this;
    xhrr.onreadystatechange = async function () {
      if (xhrr.readyState === 4) {

        if (xhrr.status === 200) {
          var response = JSON.parse(xhrr.responseText);
          that.name = response.name;

        } else {
          that.notificationService.show({
            content: xhrr.responseText,
            hideAfter: 3000,
            cssClass: 'button-notification',
            animation: { type: 'fade', duration: 400 },
            position: { horizontal: 'center', vertical: 'bottom' },
            type: { style: 'error', icon: true },
            //closable: true
          });
          that.loginout();
        }
      }
    }
  }

  loginout() {
    localStorage.removeItem("token");
    this.name = '';
    this.name2 = '';
    this.notificationService.show({
      content: "WYLOGOWANO!!",
      hideAfter: 3000,
      cssClass: 'button-notification',
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: 'info', icon: true },

    });
  }
}

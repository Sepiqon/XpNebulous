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
  auth: any = {};
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
    if (!sessionStorage.getItem("sessionToken")) {
      this.getCSFRtoken();
    }
    if (this.logged()) {
      this.getme();
      this.re();
    }
  }
  messages: Array<Message> = new Array();
  value = '';
  closeResult = '';
  toLoginout = false;
  togetme = false;
  send() {
    if (this.value !== '') {
      var model = new Message();
      if (!this.logged()) {
        model.name = this.name;
      } else {
        model.auth = this.auth;
        model.name = this.auth.name;
      }
      model.message = this.value;
      this.ws.send(model, "send", "wiadomosci", this);
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
    var that = this;
    this.createXHR("GET", "getmessages", undefined, async (req: any) => {
      if ((req.target as XMLHttpRequest).readyState === 4) {
        var response = JSON.parse((req.target as XMLHttpRequest).responseText);
        if ((req.target as XMLHttpRequest).status === 200) {
          (response as Message[]).forEach((v) => {
            that.messages.push(v);
            setTimeout(() => { that.myScrollVariable = that.scr.nativeElement.scrollHeight; }, 1);
          });
        } else {
          that.show(response.message, true);
        }
      }

    }, undefined, false);


  }
  createXHR(method: string, url: string, data: any, fun: (this: XMLHttpRequest, ev: Event) => any, methodFun: string | undefined, refreshToken: boolean) {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () { });
    xhr.open(method, "https://proxy-sepiqon.herokuapp.com/" + url, true);
    //xhr.withCredentials = false;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (methodFun) {
      xhr.setRequestHeader("fun", methodFun);
    }
    if (sessionStorage.getItem("sessionToken")) {
      xhr.setRequestHeader("csrf-token", sessionStorage.getItem("sessionToken") as string);
    }
    if (refreshToken == true) {
      xhr.setRequestHeader("refreshToken", localStorage.getItem("refreshToken") as string);
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {


      this.createXHR("POST", "login", result.value, async (req: any) => {
        if ((req.target as XMLHttpRequest).readyState === 4) {
          var response = JSON.parse((req.target as XMLHttpRequest).responseText);
          if ((req.target as XMLHttpRequest).status === 200) {
            localStorage.setItem("refreshToken", response.refreshToken);
            this.re();
            this.getme();
            that.show("Zalogowano się", false);
          } else {
            that.show(JSON.parse((req.target as XMLHttpRequest).responseText).message, true);
          }
        }

      }, undefined, false);


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
          sessionStorage.setItem("sessionToken", res.getResponseHeader("csrf-token") as string);
          if (this.toLoginout) {
            this.loginout();
            this.toLoginout = false;
          }
        } else {
          this.show(body.message, true);

        }
      }
      //Access-Control-Expose-Headers: *

    }, undefined, false);
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
    var that = this;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      this.createXHR("POST", "register", result.value, async (req: any) => {
        if ((req.target as XMLHttpRequest).readyState === 4) {
          var response = JSON.parse((req.target as XMLHttpRequest).responseText);
          if ((req.target as XMLHttpRequest).status === 200) {
            localStorage.setItem("refreshToken", response.refreshToken);
            this.getme();
            this.re();
            that.show("Zarejestrowano się", false);
          } else {
            that.show(JSON.parse((req.target as XMLHttpRequest).responseText).message, true);
          }
        }

      }, undefined, false);

    }, (reason) => {

    });
  }
  logged() {
    if (localStorage.getItem("refreshToken")) {
      return true;
    }
    return false;
  }
  getme() {
    var that = this;
    this.createXHR("GET", "getme", undefined, async (req: any) => {
      if ((req.target as XMLHttpRequest).readyState === 4) {
        var response = JSON.parse((req.target as XMLHttpRequest).responseText);
        if ((req.target as XMLHttpRequest).status === 200) {
          that.auth = response;
          that.name = response.name;

        } else {

          if ((req.target as XMLHttpRequest).statusText == "TokenExpired") {
            this.togetme = true;
            this.refreshToken();

            this.re();
          } else if ((req.target as XMLHttpRequest).statusText.replace("CS", "") != (req.target as XMLHttpRequest).statusText) {
            this.getCSFRtoken();
            this.toLoginout = true;
          } else {
            that.show(response.message, true);
          }

        }
      }

    }, undefined, false);
  }
  re() {

    setTimeout(() => {
      let v = this.re()
      this.refreshToken();
      this.getme();
    }, 1000 * 60 * 8)
    return "async function return";
  }

  loginout() {

    var that = this;
    this.createXHR("GET", "loginout", undefined, async (req: any) => {
      if ((req.target as XMLHttpRequest).readyState === 4) {
        var response = JSON.parse((req.target as XMLHttpRequest).responseText);
        if ((req.target as XMLHttpRequest).status === 200) {
          that.show(response.message, false);
          localStorage.removeItem("refreshToken");
          this.name = '';
          this.name2 = '';
        } else {
          if ((req.target as XMLHttpRequest).statusText == "TokenExpired") {
            that.refreshToken();
            that.toLoginout = true;
          }
          that.show(response.message, true);
        }
      }

    }, undefined, true);
  }
  refreshToken() {
    var that = this;
    this.createXHR("GET", "refresh", undefined, async (req: any) => {
      if ((req.target as XMLHttpRequest).readyState === 4) {
        var response = JSON.parse((req.target as XMLHttpRequest).responseText);
        if ((req.target as XMLHttpRequest).status === 200) {
          localStorage.setItem("refreshToken", response.refreshToken);
          if (that.toLoginout) {
            this.loginout();
            this.toLoginout = false;
          }
          if (that.togetme) {
            this.getme();
            this.togetme = false;
          }
          that.show(response.message, false);
        } else {
          this.show("WYLOGOWANO!!!", true);
          localStorage.removeItem("refreshToken");
          that.show(response.message, true);
        }
      }

    }, undefined, true);
  }
}

import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Message } from '../model/Message';
import { WsService } from '../ws.service';

export class ResponseReq {
  constructor(data: any, req: XMLHttpRequest) {
    this.data = data;
    this.req = req;
  }
  data: any;
  req: XMLHttpRequest = new XMLHttpRequest();
}
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
    this.getCSFRtoken().then(() => {
      if (this.logged()) {
        this.getme();
      }
    });

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
  async getmessages() {
    var that = this;
    return await that.createXHR_1_2("GET", "getmessages", undefined, undefined, false, (res: ResponseReq) => {
      (res.data as Message[]).forEach((v) => {
        that.messages.push(v);
        setTimeout(() => { that.myScrollVariable = that.scr.nativeElement.scrollHeight; }, 1);
      });
    }, (res: ResponseReq) => {
    });


  }




  async openLogin(content: any) {
    var that = this;
    await this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(async (result) => {


      return await that.createXHR_1_2("POST", "login", result.value, undefined, false, (res: ResponseReq) => {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        this.getme();
        that.show("Zalogowano się", false);
      }, (res: ResponseReq) => {
      });


    }, (reason) => {

    });
  }


  async getCSFRtoken() {
    var that = this;
    return that.createXHR_1_2("GET", "csfr", undefined, undefined, true, (res: ResponseReq) => {
      sessionStorage.setItem("sessionToken", res.req.getResponseHeader("csrf-token") as string);
    }, (res: ResponseReq) => {
    });

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
  async openRegister(content: any) {
    var that = this;


    await this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(async (result) => {
      return await that.createXHR_1_2("POST", "register", result.value, undefined, false, (res: ResponseReq) => {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        this.getme();
        that.show("Zarejestrowano się", false);
      }, (res: ResponseReq) => {
      });

    }, (reason) => {

    });
  }
  logged() {
    if (localStorage.getItem("refreshToken")) {
      return true;
    }
    return false;
  }
  async getme() {
    var that = this;

    return await that.createXHR_1_2("GET", "getme", undefined, undefined, false, (res: ResponseReq) => {
      that.auth = res.data;
      that.name = res.data.name;
    }, (res: ResponseReq) => {
      this.name = '';
      this.name2 = '';
    });
  }

  async loginout() {

    var that = this;

    return await that.createXHR_1_2("GET", "loginout", undefined, undefined, true, (res: ResponseReq) => {
      localStorage.removeItem("refreshToken");
      this.name = '';
      this.name2 = '';
    }, (res: ResponseReq) => {
    });
  }
  async refreshToken() {
    var that = this;

    return await that.createXHR_1_2("GET", "refresh", undefined, undefined, true, (res: ResponseReq) => {
      localStorage.setItem("refreshToken", res.data.refreshToken);
    }, (res: ResponseReq) => {
      this.loginout();
    });
  }




  async createXHR_1_2(method: string, url: string, dataInput: any, methodFun: string | undefined, refreshToken: boolean, sukcessCallBack: (res: ResponseReq) => void, errorCallBack: (res: ResponseReq) => void): Promise<ResponseReq> {
    var that = this;
    return new Promise<ResponseReq>((resolve, reject) => {
      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;





      xhr.onreadystatechange = function (event) {
        if (xhr.readyState !== 4) return;
        var data = JSON.parse(xhr.responseText);

        if (xhr.status != 200) {
          data.message ? that.show(data.message, true) : that.show("ERROR!!!", true);
          switch (xhr.statusText) {
            case "TokenExpired":

              that.refreshToken().then(x => {
                resolve(that.createXHR_1_2(method, url, dataInput, methodFun, refreshToken, sukcessCallBack, errorCallBack));

              });

              break;
            default:
              if (xhr.getResponseHeader("Error") == "unsafe") {
                localStorage.removeItem("refreshToken");

              } else if (xhr.statusText.replace("CS", "") != xhr.statusText) {
                that.getCSFRtoken().then(z => {
                  resolve(that.createXHR_1_2(method, url, dataInput, methodFun, refreshToken, sukcessCallBack, errorCallBack));
                });
              }
              errorCallBack(new ResponseReq(data, xhr));
              resolve(new ResponseReq(data, xhr));
              break;
          }
        } else {
          if (data.message) that.show(data.message, false);
          sukcessCallBack(new ResponseReq(data, xhr));
          resolve(new ResponseReq(data, xhr));
        }
      };


      xhr.open(method, "https://proxy-sepiqon.herokuapp.com/" + url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      if (methodFun) {
        xhr.setRequestHeader("fun", methodFun);
      }

      if (sessionStorage.getItem("sessionToken")) {
        xhr.setRequestHeader("csrf-token", sessionStorage.getItem("sessionToken") as string);
      } else if (url !== "csfr") {
        that.getCSFRtoken();
      }
      if (refreshToken == true) {
        if (localStorage.getItem("refreshToken")) {
          xhr.setRequestHeader("refreshToken", localStorage.getItem("refreshToken") as string);
        }

      }
      if (refreshToken) {
        xhr.send(JSON.stringify({ refreshToken: refreshToken }));
      } else {
        if (dataInput) {
          xhr.send(JSON.stringify(dataInput));
        } else {
          xhr.send();
        }
      }
    });
  }

}




















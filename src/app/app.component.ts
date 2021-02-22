import { PlayerModel } from './model/PlayerModel';
import { Player } from './model/Player';
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import Pusher, { AuthorizerCallback } from 'pusher-js';
import { Ws } from './model/Ws';
import { WsService } from './ws.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nasz czat';

}

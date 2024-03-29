
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericInputComponent } from './NumericInput/NumericInput.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NebulousxpComponent } from './nebulousxp/nebulousxp.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';


@NgModule({
  declarations: [
    AppComponent,
    NumericInputComponent,
    ChatComponent,
    NebulousxpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NotificationModule,
    DynamicFormsMaterialUIModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { NumericInputComponent } from './NumericInput/NumericInput.component';

const routes: Routes = [
  { path: 'test', component: NumericInputComponent },
  { path: 'test2', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

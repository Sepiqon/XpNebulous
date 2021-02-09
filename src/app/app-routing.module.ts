import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumericInputComponent } from './NumericInput/NumericInput.component';

const routes: Routes = [
  { path: 'test', component: NumericInputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

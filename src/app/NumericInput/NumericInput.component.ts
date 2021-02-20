import { Component, OnInit, AfterContentInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-NumericInput',
  templateUrl: './NumericInput.component.html',
  styleUrls: ['./NumericInput.component.css']
})
export class NumericInputComponent implements OnInit , AfterContentInit {
  @Input()
  miejscapoprzecinku=0;
  @Input()
  value = 0;
  @Output() changeValue = new EventEmitter<number>();

  @Input()
  max=100;
  @Input()
  min=0;
  constructor() { }
  ngAfterContentInit(): void {

  }

  ngOnInit() {

  }


  handleMinus() {
    if(this.value > this.min){
      this.value = this.naprawCyfryMinus(
        this.value -
        Math.pow(10,0-this.miejscapoprzecinku)
      );
      this.changeValue.emit(this.value);
    }

  }
  handlePlus() {
    if(this.value < this.max){
    this.value = this.naprawCyfryPlus(
      this.value +
      Math.pow(10,0-this.miejscapoprzecinku)
    );
    this.changeValue.emit(this.value);
    }
  }
  naprawCyfryPlus(num:number){
    return Math.round(num * Math.pow(10,this.miejscapoprzecinku)) / Math.pow(10,this.miejscapoprzecinku);

  }
  naprawCyfryMinus(num:number){
    return Math.round(num * Math.pow(10,this.miejscapoprzecinku)) / Math.pow(10,this.miejscapoprzecinku);
  }
  step(){
    return Math.pow(10, 0-this.miejscapoprzecinku);
  }
}

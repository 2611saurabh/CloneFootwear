import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Input()

  highToLow:any = 0;

  @Input()
  lowToHigh:any = 0;

  @Input()
  priceInRange:any = 0;


  @Output()
  selectedFilterRadioButtonChanged:EventEmitter<string> = new EventEmitter<string>();

  //property 
  selectedFilterRadioButton: string = ""

  
  onSelectedFilterRadioButtonChanged(){
    
   
    this.selectedFilterRadioButtonChanged.emit(this.selectedFilterRadioButton);
  }



}

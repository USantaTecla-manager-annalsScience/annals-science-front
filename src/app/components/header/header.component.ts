import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  @Output() event = new EventEmitter<string>();

  constructor() { }

  onClick(text: string){
    console.log(text);
    this.event.emit(text);
  }

}

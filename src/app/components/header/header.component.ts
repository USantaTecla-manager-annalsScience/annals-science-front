import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  @Output() event = new EventEmitter<string>();
  @Input() loggedButton: string;

  constructor() { }

  onClick(text: string){
    this.event.emit(text);
  }

}

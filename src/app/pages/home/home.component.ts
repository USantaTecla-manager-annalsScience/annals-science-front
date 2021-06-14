import { Component, OnInit } from '@angular/core';
import { DATA_ENTITY } from './models/home-data-view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeViewComponent implements OnInit {

  _dataEntity = DATA_ENTITY;

  constructor() { }

  ngOnInit(): void {
  }

}

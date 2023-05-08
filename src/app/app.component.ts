import { Component, OnInit } from '@angular/core';
import { TempStorageService } from './services/temp-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private tempStorage: TempStorageService) {

  }

  ngOnInit() {
    this.tempStorage.initStorage();
  }
}

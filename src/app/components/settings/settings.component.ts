import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  refreshRate: number;

  constructor(private dataService: DataService) {
    this.refreshRate = 30;
  }

  ngOnInit() {
    
  }

  changeRefreshRate(newRate){
    console.log(`Request to change refresh rate from ${this.refreshRate} seconds to ${newRate} seconds`);
  }

}

import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  adminAuthToken: string;
  nodeType: string;

  constructor(private router: Router, private dataService: DataService) {
    this.title = 'OpenPoll Mining GUI';
  }

  ngOnInit() {
    // Subscribe to router events
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    // Pull admin auth token and nodeType from miner
    this.dataService.getAdminInfo().subscribe((info) => {
      console.log(info.adminAuthToken, info.nodeType)
    });
  }
}

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

  // Admin Meta Info For Use In Children Components
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

    /* Pull admin auth token and nodeType from miner and set as app variable
    child components can later pull and use */
    this.dataService.getAdminInfo().subscribe((info) => {
      this.adminAuthToken = info.adminAuthToken;
      this.nodeType = info.nodeType;
    });
  }
}

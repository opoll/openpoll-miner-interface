import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private router: Router, private tokenService: TokenService) {
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
    
  }
}

import { Component, OnInit } from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {MenuItems} from '../../shared/menu-items/menu-items';
import { ToastService } from '../../services/toast.service';
import {EventService} from '../../services/event.service';
import {TokenService} from '../../services/token.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'hidden',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '300px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  public navType: string;
  public themeLayout: string;
  public verticalPlacement: string;
  public verticalLayout: string;
  public pcodedDeviceType: string;
  public verticalNavType: string;
  public verticalEffect: string;
  public vnavigationView: string;
  public freamType: string;
  public sidebarImg: string;
  public sidebarImgType: string;
  public layoutType: string;

  public headerTheme: string;
  public pcodedHeaderPosition: string;

  public liveNotification: string;
  public liveNotificationClass: string;

  public profileNotification: string;
  public profileNotificationClass: string;

  public chatSlideInOut: string;
  public innerChatSlideInOut: string;

  public searchWidth: number;
  public searchWidthString: string;

  public navRight: string;
  public windowWidth: number;
  public chatTopPosition: string;

  public toggleOn: boolean;
  public navBarTheme: string;
  public activeItemTheme: string;
  public pcodedSidebarPosition: string;

  public menuTitleTheme: string;
  public dropDownIcon: string;
  public subItemIcon: string;

  public configOpenRightBar: string;
  public displayBoxLayout: string;
  public isVerticalLayoutChecked: boolean;
  public isSidebarChecked: boolean;
  public isHeaderChecked: boolean;
  public headerFixedMargin: string;
  public sidebarFixedHeight: string;
  public itemBorderStyle: string;
  public subItemBorder: boolean;
  public itemBorder: boolean;

  public config: any;

  // Custom Variables that are subscribed to so any component can set
  // the toast through the toast service
  public isToastVisible: boolean;
  public toastClass: string;
  public toastStrong: string;
  public toastMessage: string;

  // Notifications
  notifications: Notification[];

  // Token
  token: string;

  // If miner is authenticated yet
  isAuthenticated: boolean;

  // If unread notifications
  unreadNotificationsExist = false;

  constructor(public menuItems: MenuItems,
              private eventService: EventService,
              private toastService: ToastService,
              private tokenService: TokenService,
              private dataService: DataService) {
    // Setting view variables
    this.navType = 'st2';
    this.themeLayout = 'vertical';
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.pcodedDeviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.vnavigationView = 'view1';
    this.freamType = 'theme1';
    this.sidebarImg = 'false';
    this.sidebarImgType = 'img1';
    this.layoutType = 'light';

    this.headerTheme = 'themelight5';
    this.pcodedHeaderPosition = 'fixed';

    this.liveNotification = 'an-off';
    this.profileNotification = 'an-off';

    this.chatSlideInOut = 'out';
    this.innerChatSlideInOut = 'out';

    this.searchWidth = 0;

    this.navRight = 'nav-on';

    this.windowWidth = window.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    this.toggleOn = true;
    this.navBarTheme = 'theme1';
    this.activeItemTheme = 'theme10';
    this.pcodedSidebarPosition = 'fixed';
    this.menuTitleTheme = 'theme6';
    this.dropDownIcon = 'style3';
    this.subItemIcon = 'style7';

    this.displayBoxLayout = 'd-none';
    this.isVerticalLayoutChecked = false;
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;
    this.headerFixedMargin = '56px';
    this.sidebarFixedHeight = 'calc(100vh - 56px)';
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.itemBorder = true;

    this.setMenuAttributes(this.windowWidth);
    this.setHeaderAttributes(this.windowWidth);
  }

  ngOnInit() {
    // Placeholder values
    this.notifications = [];

    // Subscribe to toast message visibility
    this.toastService.isToastVisible.subscribe(visibility => {
      this.isToastVisible = visibility;
    });

    // Subscribe to toast message class
    this.toastService.toastClass.subscribe(clazz => {
      this.toastClass = clazz;
    });

    // Subscribe to toast message bolded text
    this.toastService.toastStrong.subscribe(strongText => {
      this.toastStrong = strongText;
    });

    // Subscribe to toast message main message
    this.toastService.toastMessage.subscribe(toastMessage => {
      this.toastMessage = toastMessage;
    });

    // Subscribe to observable admin auth token
    this.tokenService.adminAuthToken.subscribe(adminAuthToken => {
      this.token = adminAuthToken;
    });

    // Subscribe to observable isAuthenticated
    this.tokenService.isAuthenticated.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // Fetch the notifications since miner is authenticated
        this.fetchNotifications();
      }

      // Update component's value of isAuthenticated
      this.isAuthenticated = isAuthenticated;
    });

    // TODO: Make the dates display as human readable dates like "30 minutes ago" or "5 seconds ago" and recalculate everytime the drawer opens
    // TODO: When notifications overflow let it say "see more" or just make the whole panel scrollable so it doesn't cutoff notifications
    // Hook the admin component to event data that will yield notifications
    this.eventService.eventData.subscribe(eventData => {
      // If the event is a new notification perform correct action
      if (eventData.event === 'newNotification') {

        // Add notification to notifications array at front since
        // array is already sorted and this is the freshest notification
        this.notifications.unshift(eventData.notification);

        // We have a new notification. Set boolean.
        this.unreadNotificationsExist = true;

      }
    });

    this.setBackgroundPattern('pattern1');
    /*document.querySelector('body').classList.remove('dark');*/
  }

  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    let reSizeFlag = true;
    if (this.pcodedDeviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.pcodedDeviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setHeaderAttributes(windowWidth) {
    if (windowWidth < 992) {
      this.navRight = 'nav-off';
    } else {
      this.navRight = 'nav-on';
    }
  }

  setMenuAttributes(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.pcodedDeviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else if (windowWidth < 768) {
      this.pcodedDeviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.pcodedDeviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  toggleHeaderNavRight() {
    this.navRight = this.navRight === 'nav-on' ? 'nav-off' : 'nav-on';
    this.chatTopPosition = this.chatTopPosition === 'nav-on' ? '112px' : '';
    if (this.navRight === 'nav-off' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.navRight === 'nav-off' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleLiveNotification() {
    // Notifications have been read if bell is clicked
    this.unreadNotificationsExist = false;

    this.liveNotification = this.liveNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.liveNotificationClass = this.liveNotification === 'an-animate' ? 'active' : '';

    if (this.liveNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.liveNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleProfileNotification() {
    this.profileNotification = this.profileNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.profileNotificationClass = this.profileNotification === 'an-animate' ? 'active' : '';

    if (this.profileNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.profileNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  notificationOutsideClick(ele: string) {
    if (ele === 'live' && this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    } else if (ele === 'profile' && this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }
  }

  toggleChat() {
    this.chatSlideInOut = this.chatSlideInOut === 'out' ? 'in' : 'out';
    if (this.innerChatSlideInOut === 'in') {
      this.innerChatSlideInOut = 'out';
    }
  }

  toggleInnerChat() {
    this.innerChatSlideInOut = this.innerChatSlideInOut === 'out' ? 'in' : 'out';
  }

  searchOn() {
    document.querySelector('#main-search').classList.add('open');
    const searchInterval = setInterval(() => {
      if (this.searchWidth >= 200) {
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth + 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  searchOff() {
    const searchInterval = setInterval(() => {
      if (this.searchWidth <= 0) {
        document.querySelector('#main-search').classList.remove('open');
        clearInterval(searchInterval);
        return false;
      }
      this.searchWidth = this.searchWidth - 15;
      this.searchWidthString = this.searchWidth + 'px';
    }, 35);
  }

  toggleOpened() {
    if (this.windowWidth < 992) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      if (this.navRight === 'nav-on') {
        this.toggleHeaderNavRight();
      }
    }
    this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
  }

  onClickedOutsideSidebar(e: Event) {
    if ((this.windowWidth < 992 && this.toggleOn && this.verticalNavType !== 'offcanvas') || this.verticalEffect === 'overlay') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  setNavBarTheme(theme: string) {
    if (theme === 'themelight1') {
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      this.sidebarImg = 'false';
    } else {
      this.menuTitleTheme = 'theme6';
      this.navBarTheme = 'theme1';
      this.sidebarImg = 'false';
    }
  }

  setLayoutType(type: string) {
    this.layoutType = type;
    if (type === 'dark') {
      this.headerTheme = 'theme1';
      this.sidebarImg = 'false';
      this.navBarTheme = 'theme1';
      this.menuTitleTheme = 'theme6';
      document.querySelector('body').classList.add('dark');
    } else if (type === 'light') {
      this.sidebarImg = 'false';
      this.headerTheme = 'theme5';
      this.navBarTheme = 'themelight1';
      this.menuTitleTheme = 'theme1';
      document.querySelector('body').classList.remove('dark');
    } else if (type === 'img') {
      this.sidebarImg = 'true';
      this.headerTheme = 'theme1';
      this.navBarTheme = 'theme1';
      this.menuTitleTheme = 'theme6';
      document.querySelector('body').classList.remove('dark');
    }
  }

  setVerticalLayout() {
    this.isVerticalLayoutChecked = !this.isVerticalLayoutChecked;
    if (this.isVerticalLayoutChecked) {
      this.verticalLayout = 'box';
      this.displayBoxLayout = '';
    } else {
      this.verticalLayout = 'wide';
      this.displayBoxLayout = 'd-none';
    }
  }

  setBackgroundPattern(pattern: string) {
    document.querySelector('body').setAttribute('themebg-pattern', pattern);
  }

  setSidebarPosition() {
    this.isSidebarChecked = !this.isSidebarChecked;
    this.pcodedSidebarPosition = this.isSidebarChecked === true ? 'fixed' : 'absolute';
    this.sidebarFixedHeight = this.isHeaderChecked === true ? 'calc(100vh + 56px)' : 'calc(100vh - 56px)';
  }

  setHeaderPosition() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
    this.headerFixedMargin = this.isHeaderChecked === true ? '56px' : '';
  }

  // Fetch the notifications from the miner and set the notifications array
  fetchNotifications() {
    // Fetch the notifications
    this.dataService.getNotifications(this.token).subscribe((data) => {
      // Extract the notifications array & set it to be the
      // displayed notifications data
      this.notifications = data.notifications;

      // Sort the notifications by date
      sortByDate(this.notifications);

    });
  }

  // Delete a notification that has a specified ID
  deleteNotification(targetId) {

    this.dataService.deleteNotification(targetId, this.token).subscribe((result) => {
      // Refetch notifications updated to update GUI
      this.fetchNotifications();

      // Toast
      this.toastService.show('success', 'Success! Notification deleted.', '', 4);
    });

  }

  // Delete a set of notifications that fall behind a epoch date
  deleteNotifications(cutoffInHours) {
    const cutoffInSeconds = hoursToSeconds(cutoffInHours);
    const cutoffEpoch = nowAsEpoch() - cutoffInSeconds;

    this.dataService.deleteNotifications(cutoffEpoch, this.token).subscribe((result) => {
      // Refetch notifications updated to update GUI
      this.fetchNotifications();

      // Determine toast mainText
      let mainText;
      if (result.numDeleted === 1) {
        mainText = '1 notification deleted from the queue.';
      } else {
        mainText = `${result.numDeleted} notifications deleted from the queue.`;
      }

      // Toast
      this.toastService.show('success', 'Success!', mainText, 4);
    });

  }

  epochToDateString(epoch) {
    const date = new Date(epoch * 1000);
    return date.toLocaleString();
  }

}

// Converts a value in hours to seconds
function hoursToSeconds(hours) {
  return hours * 60 * 60; // hours -> minutes -> seconds
}

// Returns the current epoch time
function nowAsEpoch() {
  return Math.floor((new Date).getTime() / 1000);
}

function sortByDate(notifArray) {
  notifArray.sort(compareNotificationsByDate);
}

function compareNotificationsByDate(a, b) {
  if (a.dateCreated > b.dateCreated) {
    return -1;
  } else if (a.dateCreated < b.dateCreated) {
    return 1;
  }

  return 0;
}

interface Notification {
  id: string; // Random 8 byte hexadecimal ID
  type: string; // Either "shard", "mainchain", or "general"
  title: string; // The notification's title
  message: string; // The notification's message
  dateCreated: number; // Epoch date the notification was created
}

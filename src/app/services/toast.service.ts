import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ToastService {

  // Is the toast visible? This sets the visibility of the toast.
  private isToastVisibleSource = new BehaviorSubject<boolean>(false);
  isToastVisible = this.isToastVisibleSource.asObservable();

  // The toast's css class. Options are:
  // primary (blue)
  // secondary (light grey)
  // success (green)
  // danger (red)
  // warning (yellow)
  // info (sky blue)
  // light (white/grey)
  // dark (dark grey)
  private toastClassSource = new BehaviorSubject<string>('success');
  toastClass = this.toastClassSource.asObservable();

  // Bolded text to start the toast message.
  private toastStrongSource = new BehaviorSubject<string>('Bolded Message.');
  toastStrong = this.toastStrongSource.asObservable();

  // The main message of the toast.
  private toastMessageSource = new BehaviorSubject<string>('Main Message');
  toastMessage = this.toastMessageSource.asObservable();

  private TOAST_DURATION = 3000;

  constructor() { }

  // Show the toast with custom values passed in set
  // class -> toast class
  // boldText -> bolded text that starts the toast message
  // mainText -> main text of the toast message
  // duration -> duration of the toast in seconds
  show(clazz, boldText, mainText, duration) {
    // Set Class
    this.setClass(clazz);

    // Set Bold Message
    this.setBoldText(boldText);

    // Set Main Message
    this.setMessage(mainText);

    // Show toast
    this.setToastVisibility(true);

    // Set visibility back to false after TOAST_DURATION
    setTimeout(() => {
      this.setToastVisibility(false);
    }, duration * 1000);
  }

  // Set toast's visibility
  setToastVisibility(value) {
    this.isToastVisibleSource.next(value);
  }

  // Set toast's class
  setClass(value) {
    this.toastClassSource.next(value);
  }

  // Set toast's bold text
  setBoldText(text) {
    this.toastStrongSource.next(text);
  }

  // Set toast's message
  setMessage(text) {
    this.toastMessageSource.next(text);
  }

}

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

  constructor() { }

  showToast(clazz, boldText, mainText) {
    // Set Class
    this.setClass(clazz);

    // Set Bold Message
    this.setBoldText(boldText);

    // Set Main Message
    this.setMessage(mainText);

    // Show toast
    this.setToastVisibility(true);
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

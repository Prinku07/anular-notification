
import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 // styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'anular-notification';
  message:any = null;
  notificationcount : BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('dxscdvf') ?localStorage.getItem('dxscdvf') : 0 );
  constructor() {}
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  requestPermission() {
    console.log(localStorage.getItem('dxscdvf'))
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      debugger
      this.notificationcount.next(+this.notificationcount.value + 1);
      localStorage.setItem('dxscdvf', this.notificationcount.value )

      console.log('Message received. ', this.notificationcount.value);
      this.message=payload;
    });

    this.notificationcount.subscribe(res => {
      console.log(res)
    })
  }

  clear(){this.notificationcount.next(0); localStorage.removeItem('dxscdvf') } 
}
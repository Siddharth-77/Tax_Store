/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openInNewTab(): void {
    // Define the URL of the component you want to open
    const componentUrl = 'http://localhost:4200/enquires/loginlog';

    // Open the component in a new tab
    window.open(componentUrl, '_blank');
  }


}

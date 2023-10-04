import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;
  events: string[] = [];
  opened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public navClick(event) {
    this.sidenav.toggle();
  }
}

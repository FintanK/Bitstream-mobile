import { Component } from '@angular/core';
import {User} from "../../types/user";

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  users: User[] = [];

  constructor() {}

}

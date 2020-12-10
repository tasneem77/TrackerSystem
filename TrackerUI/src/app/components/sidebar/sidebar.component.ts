import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/projects', title: 'Projects', icon: 'leaderboard', class: '' },
  { path: '/teams', title: 'Teams', icon: 'groups', class: '' },
  { path: '/employees', title: 'Employees', icon: 'people', class: 'people' },
 // { path: '/milestones', title: 'MileStones', icon: 'subject', class: '' },
  { path: '/tasks', title: 'Tasks', icon: 'schedule', class: '' },
  { path: '/timesheets', title: 'Time Sheets', icon: 'today', class: '' },
  { path: '/requests', title: 'Requests', icon: 'list', class: '' },
  { path: '/clients', title: 'Clients', icon: 'recent_actors', class: 'people' },
  { path: '/problems', title: 'Problems', icon: 'error_outline', class: '' },
 // { path: '/addRole', title: 'Add Role', icon: 'groups', class: '' },
  { path: '/roles', title: 'Roles', icon: 'groups', class: '' },
  { path: '/userroles', title: 'Users Roles', icon: 'person', class: '' }
];

export const UserROUTES: RouteInfo[] = [

  { path: '/projects', title: 'Projects', icon: 'leaderboard', class: '' },
 { path: '/tasks', title: 'Tasks', icon: 'schedule', class: '' },
  { path: '/timesheets', title: 'Time Sheets', icon: 'today', class: '' },
  { path: '/requests', title: 'Requests', icon: 'list', class: '' },
];

export const PMROUTES: RouteInfo[] = [
  { path: '/projects', title: 'Projects', icon: 'leaderboard', class: '' },
  { path: '/teams', title: 'Teams', icon: 'groups', class: '' },
  { path: '/milestones', title: 'MileStones', icon: 'subject', class: '' },
  { path: '/tasks', title: 'Tasks', icon: 'schedule', class: '' },
  { path: '/timesheets', title: 'Time Sheets', icon: 'today', class: '' },
  { path: '/requests', title: 'Requests', icon: 'list', class: '' },
  { path: '/clients', title: 'Clients', icon: 'recent_actors', class: 'people' },
];




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    let roleName  = localStorage.getItem("roleName");
   if(roleName == "User")
   {
    this.menuItems = UserROUTES.filter(menuItem => menuItem);
   }
   if(roleName == "PM")
   {
    this.menuItems = PMROUTES.filter(menuItem => menuItem);
   }
   else
   {
   this.menuItems = ROUTES.filter(menuItem => menuItem);
   }
  }
  isMobileMenu() {
    // if ($(window).width() > 991) {
    //     return false;
    // }
    return true;
  };
}

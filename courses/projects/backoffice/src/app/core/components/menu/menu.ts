import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'cdev-menu',
  imports: [MatListModule, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  routes = [
    { title: 'Dashboard', path: '/layout/dashboard', icon: 'dashboard' },
    { title: 'Users', path: '/layout/users', icon: 'people' },
    { title: "Courses", path: '/layout/courses', icon: 'school' },
  ]
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Menu } from '../menu/menu';
import { Header } from '../header/header';

@Component({
  selector: 'cdev-layout',
  imports: [RouterOutlet, MatSidenavModule, Menu, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout { }

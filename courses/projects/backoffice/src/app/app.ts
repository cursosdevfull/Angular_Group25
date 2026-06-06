import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from 'cursosdev_angular25';

@Component({
  selector: 'cdev-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('backoffice');
}
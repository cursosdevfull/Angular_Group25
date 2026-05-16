import { Component, computed, inject } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoaderService } from './loader-service';

@Component({
  selector: 'cdev-lib-loader',
  imports: [MatProgressBarModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  loadingService = inject(LoaderService);

  isLoading = computed(() => this.loadingService.isLoading());
}

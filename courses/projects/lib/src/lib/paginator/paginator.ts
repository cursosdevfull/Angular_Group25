import { Component, input, output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorDefinition } from './paginator-definition';
@Component({
  selector: 'cdev-lib-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorDefinition
    }
  ]
})
export class Paginator {
  length = input.required<number>();
  onPageChanged = output<number>();
  pageSize = 20;

  pageChanged(event: PageEvent) {
    this.onPageChanged.emit(event.pageIndex);
  }
}

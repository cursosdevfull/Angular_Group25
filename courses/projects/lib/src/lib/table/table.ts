import { Component, contentChildren, effect, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { MatColumnDef, MatTable, MatTableModule } from '@angular/material/table';
import { isComputedColumn, MetaColumn } from '../types/metacolumns';
import { Scrollbars } from '../scrollbars/scrollbars';

@Component({
  selector: 'cdev-lib-table',
  imports: [MatTableModule, Scrollbars],
  templateUrl: './table.html',
  styleUrl: './table.css',
  encapsulation: ViewEncapsulation.None
})
export class Table {
  metaColumns = input.required<MetaColumn<any>[]>();
  data = input<any[]>([]);
  table = viewChild.required<MatTable<any>>(MatTable)
  columnDefs = contentChildren<MatColumnDef>(MatColumnDef);
  onSelectedRow = output<any>();

  displayedColumns = signal<string[]>([]);

  constructor() {
    effect(() => {
      const metaCols = this.metaColumns().map(item => item.field.toString());
      const projectedCols = this.columnDefs().map(col => col.name);
      this.displayedColumns.set([...metaCols, ...projectedCols]);

      this.columnDefs().forEach(col => this.table().addColumnDef(col));
    })
  }

  selectRow(row: any) {
    this.onSelectedRow.emit(row);
  }

  getCellValue(row: Record<string, unknown>, column: MetaColumn<unknown>) {
    return isComputedColumn(column) ? column.valueFn(row) : row[column.field];
  }
}

import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class PaginatorDefinition extends MatPaginatorIntl {
    override firstPageLabel: string = 'Primera página';
    override itemsPerPageLabel: string = 'Items por página';
    override lastPageLabel: string = 'Última página';
    override nextPageLabel: string = 'Siguiente página';
    override previousPageLabel: string = 'Página anterior';

    override getRangeLabel: (page: number, pageSize: number, length: number) => string = (page: number, pageSize: number, length: number) => {
        return "Página " + (page + 1) + " de " + Math.ceil(length / pageSize);
    }
}
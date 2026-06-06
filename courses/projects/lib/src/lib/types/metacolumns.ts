type DirectColumn<T> = {
    label: string;
    field: keyof T & string;
}

type ComputedColumn<T> = {
    label: string;
    field: keyof T & string;
    valueFn: (row: T) => unknown;
}

export type MetaColumn<T> = DirectColumn<T> | ComputedColumn<T>;
export type MetaColumns<T> = MetaColumn<T>[];

export function isComputedColumn<T>(col: MetaColumn<T>): col is ComputedColumn<T> {
    return "valueFn" in col;
}

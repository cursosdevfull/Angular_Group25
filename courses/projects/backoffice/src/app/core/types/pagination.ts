export type PAGINATION<T> = {
    "data": T[],
    "pagination": {
        "page": number,
        "limit": number,
        "total": number,
        "totalPages": number,
        "hasNextPage": boolean,
        "hasPreviousPage": boolean
    }
}
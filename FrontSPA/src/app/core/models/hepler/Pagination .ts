export interface Pagination {

    currentPage:number;
    itemPerPage:number;
    totalItems:number;
    totalPages:number;
    filterType :string;
    filterValue :string;
    from:number;
    to:number;
}
export class PaginationResult<T>
{
result?:T;
pagination?:Pagination;

}

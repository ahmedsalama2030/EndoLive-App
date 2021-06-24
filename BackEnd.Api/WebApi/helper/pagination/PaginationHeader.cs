namespace WebApi.helper.pagination
{
   public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int from { get; set; }
        public int to { get; set; }

        public PaginationHeader(int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.ItemPerPage = itemPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
            this.from=(((currentPage*itemPerPage)-itemPerPage)+1);
            this.to=((totalItems)>(currentPage*itemPerPage))?(currentPage*itemPerPage):(totalItems);
        }
    }
}
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={currentPage}
      onPageChange={onPageChange}
      containerClassName="flex items-center justify-center space-x-2 my-8"
      pageClassName="rounded-md cursor-pointer h-10"
      pageLinkClassName="px-3 h-10 inline-flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
      activeClassName="bg-green-500"
      activeLinkClassName="text-white hover:text-white hover:bg-green-500"
      previousClassName="rounded-md cursor-pointer h-10"
      nextClassName="rounded-md cursor-pointer h-10"
      previousLinkClassName="px-3 h-10 inline-flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
      nextLinkClassName="px-3 h-10 inline-flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
      breakClassName="px-3 h-10 inline-flex items-center text-gray-400"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};

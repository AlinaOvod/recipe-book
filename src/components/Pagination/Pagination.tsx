import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import './Pagination.css';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  return (
    <div className="pagination">
      <ReactPaginate
        containerClassName={'pagination__content'}
        pageClassName={classNames('pagination__btn text-body')}
        activeClassName={'pagination__btn--selected'}
        pageLinkClassName={'pagination__btnLink'}
        previousLinkClassName={classNames(
          'pagination__arrow--prev pagination__arrow',
          {
            disabled: firstPage,
          },
        )}
        nextLinkClassName={classNames(
          'pagination__arrow--next pagination__arrow',
          {
            disabled: lastPage,
          },
        )}
        disabledLinkClassName={'pagination__arrow--disabled'}
        pageRangeDisplayed={7}
        marginPagesDisplayed={1}
        onPageChange={(event) => onPageChange(event.selected)}
        pageCount={totalPages}
        breakLabel="..."
        previousLabel={
          <img
            src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vdmUtbGVmdCI+PHBhdGggZD0iTTYgOEwyIDEyTDYgMTYiLz48cGF0aCBkPSJNMiAxMkgyMiIvPjwvc3ZnPg=='
            className="icon"
          />
        }
        nextLabel={
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vdmUtcmlnaHQiPjxwYXRoIGQ9Ik0xOCA4TDIyIDEyTDE4IDE2Ii8+PHBhdGggZD0iTTIgMTJIMjIiLz48L3N2Zz4="
            className="icon"
          />
        }
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/actions";

export default function Pagination() {
  const dispatch = useDispatch();
  const { total, limit, offset } = useSelector(state => state.product);
  
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  
  const handlePageChange = (newPage) => {
    const newOffset = (newPage - 1) * limit;
    dispatch(fetchProducts({ offset: newOffset }));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center px-6">
      <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-6 py-4 text-sm font-black text-[#23A6F0] transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          PREVIOUS
        </button>
        
        {getVisiblePages().map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`border-l border-gray-100 px-5 py-4 text-sm font-bold transition-colors hover:bg-gray-50 ${
              page === currentPage
                ? "bg-[#23A6F0] text-white shadow-inner"
                : "text-[#23A6F0]"
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="border-l border-gray-100 px-6 py-4 text-sm font-black text-[#23A6F0] transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
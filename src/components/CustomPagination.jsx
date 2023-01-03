import { Pagination } from "@mui/material";

const CustomPagination = () => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };
  return (
    <Pagination
      count={10}
      onChange={(e) => handlePageChange(e.target.textContent)}
    />
  );
};

export default CustomPagination;

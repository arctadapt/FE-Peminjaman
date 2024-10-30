import { Box, TablePagination, useTheme, useMediaQuery } from "@mui/material";

const Pagination = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        width: '100%',
        overflowX: isMobile ? 'auto' : 'hidden',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        showFirstButton
        showLastButton
        sx={{
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center',
          alignItems: 'center',
          maxWidth: isMobile ? '82vw' : '100%',
          '& .MuiTablePagination-toolbar': {
            justifyContent: isMobile ? 'flex-start' : 'center',
            width: '100%',
          },
          '& .MuiTablePagination-displayedRows': {
            margin: '5px',
          },
          '& .MuiTablePagination-selectLabel': {
            margin: '5px',
          },
          '& .MuiTablePagination-select': {
            margin: '5px 5px 2px 5px',
          },
          '& .MuiTablePagination-actions': {
            marginRight: '5px',
          },
        }}
      />
    </Box>
  );
};

export default Pagination;

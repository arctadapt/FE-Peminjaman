import React from 'react';
import { Box, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

const Search = ({ searchKeyword, setSearchKeyword, handleSearch }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile view

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Call handleSearch on Enter
        }
    };

    return (
        <Box 
            sx={{
                display: "flex",
                p: isMobile ? 0.5 : 1,
                borderRadius: 1,
                boxShadow: 2,
                width: isMobile ? "20rem" : "35rem",
                "&:hover": {
                    boxShadow: 4,
                },
            }}
        >
            <TextField
                label="Search"
                variant="outlined"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={handleKeyPress} // Add onKeyPress handler
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        backgroundColor: "#ffffff",
                        "& fieldset": {
                            borderColor: "#ced4da",
                        },
                        "&:hover fieldset": {
                            borderColor: "#f50202",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#f50202",
                        },
                    },
                    "& .MuiInputLabel-outlined": {
                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                    },
                    "& .MuiOutlinedInput-input": {
                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                        padding: isMobile ? "6px" : "6px",
                    },
                }}
                size="small"
            />

            <Button 
                variant="contained"
                color="danger"
                onClick={handleSearch}
                sx={{
                    ml: isMobile ? 0.5 : 1, 
                    fontSize: isMobile ? "0.65rem" : "0.75rem",  
                    padding: isMobile ? '3px 10px' : '5px 15px', 
                    minWidth: '40px', 
                    backgroundColor: theme.palette.primary.main, 
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark, 
                    },
                }}
            >
                <FaSearch fontSize="small" />
            </Button>
        </Box>
    );
};

export default Search;

import { FC, ChangeEvent } from "react";
import { Pagination, Box } from "@mui/material";

import { setCurrentPage } from "../../features/comments/commentsSlice";
import { useTypedDispatch } from "../../store/hooks";

interface IPaginationComponentProps {
    total: number;
    limit: number;
    currentPage: number;
}

export const PaginationList: FC<IPaginationComponentProps> = (
    {
        total,
        limit,
        currentPage
    }) => {
    const dispatch = useTypedDispatch();
    const pageCount = Math.ceil(total / limit);

    const handleChangePage = (_: ChangeEvent<unknown>, page: number) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            sx={{margin: "16px 0"}}
        >
            <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                variant="outlined"
                shape="rounded"
            />
        </Box>
    );
};

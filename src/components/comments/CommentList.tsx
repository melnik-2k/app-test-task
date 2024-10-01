import { FC, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";

import { useTypedDispatch, useTypedSelector } from "../../store/hooks";
import { fetchComments } from "../../features/comments/commentsActions";

import { CommentItem } from "./CommentItem";
import { PaginationList } from "../pagination/PaginationList";
import { AddNewComment } from "./AddNewComment";
import { Loader } from "../ui/loader/Loader";

export const CommentList: FC = () => {
    const dispatch = useTypedDispatch();
    const {
        items, isLoading, error, currentPage, total, limit
    } = useTypedSelector(state => state.comments);

    useEffect(() => {
        dispatch(fetchComments({skip: currentPage, limit}));
    }, [dispatch, currentPage, limit]);

    if (isLoading) {
        return(
            <Loader isLoading={isLoading}/>
        )
    }

    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
            </Alert>
        );
    }

    return (
        <>
            <AddNewComment/>
            {items.map(comment => (<CommentItem key={comment.id} comment={comment}/>))}
            <PaginationList total={total} limit={limit} currentPage={currentPage}/>
        </>
    );
};
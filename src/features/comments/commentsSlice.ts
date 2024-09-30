import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment, IResponseComments } from "../../types";
import { fetchComments, IFetchCommentsError } from "./commentsActions";

interface ICommentsState {
    items: IComment[];
    limit: number;
    skip: number;
    currentPage: number;
    total: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: ICommentsState = {
    items: [],
    limit: 10,
    skip: 0,
    currentPage: 1,
    total: 0,
    isLoading: false,
    error: null,
};

export const commentsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        addComment: (state, action: PayloadAction<IComment>) => {
            state.items.push(action.payload);
        },
        deleteComment: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(comment => comment.id !== action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, {
                payload: {
                    comments,
                    total,
                    limit,
                    skip
                }
            }: PayloadAction<IResponseComments>) => {
                state.isLoading = false;
                state.items = comments;
                state.total = total;
                state.limit = limit;
                state.skip = skip;
            })
            .addCase(fetchComments.rejected, (
                state,
                action: PayloadAction<IFetchCommentsError | undefined>
            ) => {
                state.isLoading = false;
                if (action.payload) {
                    state.error = action.payload.message;
                } else {
                    state.error = 'Failed to fetch comments';
                }
            })
    }
});

export const { addComment, setCurrentPage, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
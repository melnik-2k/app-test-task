import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IResponseComments } from "../../types";

export interface IFetchCommentsError {
    message: string;
    status?: number;
}

export const fetchComments = createAsyncThunk<
    IResponseComments,
    { limit?: number; skip?: number },
    { rejectValue: IFetchCommentsError  }
>(
    'comments/fetchComments',
    async ({limit = 10, skip = 0}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://dummyjson.com/comments/?limit=${limit}&skip=${skip}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue({
                    message: error.message,
                    status: error.response?.status,
                });
            } else {
                return rejectWithValue({
                    message: 'Unexpected error occurred',
                });
            }
        }
    }
)
import commentsReducer, {
    addComment,
    deleteComment,
    ICommentsState,
    setCurrentPage
} from "../../../features/comments/commentsSlice";
import { fetchComments } from "../../../features/comments/commentsActions";
import { IComment, IResponseComments } from "../../../types";

describe("Comments feature slice", () => {
    const initialState: ICommentsState = {
        items: [],
        limit: 10,
        skip: 0,
        currentPage: 1,
        total: 0,
        isLoading: false,
        error: null,
    };

    it("should handle fetchComments.pending", () => {
        const action = { type: fetchComments.pending.type };
        const { isLoading, error } = commentsReducer(initialState, action);

        expect(isLoading).toBe(true);
        expect(error).toBe(null);
    });

    it("should handle fetchComments.fulfilled", () => {
        const mockResponse: IResponseComments = {
            comments: [{
                id: 1,
                body: "Test comment",
                likes: 1,
                user: {id: 1, username: "Dan", fullName: "Daniel"},
                postId: 3
            }],
            total: 1,
            limit: 10,
            skip: 0,
        };

        const action = { type: fetchComments.fulfilled.type, payload: mockResponse };
        const { isLoading, items, total, limit, skip } = commentsReducer(initialState, action);

        expect(isLoading).toBe(false);
        expect(items).toEqual(mockResponse.comments);
        expect(total).toBe(mockResponse.total);
        expect(limit).toBe(mockResponse.limit);
        expect(skip).toBe(mockResponse.skip);
    });

    it("should handle fetchComments.rejected with error payload", () => {
        const action = {
            type: fetchComments.rejected.type,
            payload: {message: "Error fetching comments"},
        };

        const { isLoading, error } = commentsReducer(initialState, action);

        expect(isLoading).toBe(false);
        expect(error).toBe("Error fetching comments");
    });

    it("should handle fetchComments.rejected without error payload", () => {
        const action = {type: fetchComments.rejected.type, payload: undefined};

        const { isLoading, error } = commentsReducer(initialState, action);

        expect(isLoading).toBe(false);
        expect(error).toBe("Failed to fetch comments");
    });

    it("should handle setCurrentPage", () => {
        const action = setCurrentPage(2);
        const { currentPage } = commentsReducer(initialState, action);

        expect(currentPage).toBe(2);
    });

    it("should handle adding a comment", () => {
        const newComment: IComment = {
            id: 1,
            body: "New comment",
            likes: 0,
            user: {
                id: 1,
                username: "User",
                fullName: "User Fullname"
            },
            postId: 1
        };
        const action = addComment(newComment);
        const { items, total } = commentsReducer(initialState, action);

        expect(items).toHaveLength(1);
        expect(total).toBe(1);
    });


    it("should handle deleting a comment", () => {
        const initialStateWithComments: ICommentsState = {
            ...initialState,
            items: [{
                id: 1,
                body: "New Comment",
                likes: 0,
                user: {
                    id: 1,
                    username: "User1",
                    fullName: "User One"
                },
                postId: 3
            }],
            total: 1,
        };

        const action = deleteComment(1);
        const { items, total } = commentsReducer(initialStateWithComments, action);

        expect(items).toHaveLength(0);
        expect(total).toBe(0);
    });

    it("should not mutate the state directly", () => {
        const initialStateWithComments: ICommentsState = {
            ...initialState,
            items: [{
                id: 1,
                body: "New Comment",
                likes: 0,
                user: {
                    id: 1,
                    username: "User1",
                    fullName: "User One"
                },
                postId: 3
            }],
        };

        const action = deleteComment(1);
        const { items } = commentsReducer(initialStateWithComments, action);

        expect(initialStateWithComments.items).toHaveLength(1);
        expect(items).toHaveLength(0);
    });
});
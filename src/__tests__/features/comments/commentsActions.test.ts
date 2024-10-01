import mockedAxios from "../../../__mocks__/axiosMock";
import { fetchComments } from "../../../features/comments/commentsActions";
import { IComment, IResponseComments } from "../../../types";
import { store } from "../../../store/store";

jest.mock("axios");

describe("Fetch comments thunk", () => {
    it("should dispatch the correct action with the expected payload on successful request", async () => {
        const response: IResponseComments = { comments: [], total: 0, skip: 0, limit: 10 };
        mockedAxios.get.mockResolvedValue({ data: response });

        const dispatch = jest.fn();
        const thunk = fetchComments({ limit: 10, skip: 0 });

        await thunk(dispatch, () => ({}), undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: "comments/fetchComments/fulfilled",
            payload: response,
        }));
    });

    it("should dispatch fulfilled action and update the store on successful request", async () => {
        const mockComments: IComment[] = [{
            id: 1,
            body: "Test comment",
            likes: 1,
            user: { id: 1, username: "Dan", fullName: "Daniel" },
            postId: 3
        }];
        mockedAxios.get.mockResolvedValueOnce({ data: { comments: mockComments } });

        const result = await store.dispatch(fetchComments({ limit: 10, skip: 0 }));
        expect(result.type).toBe("comments/fetchComments/fulfilled");

        const { comments } = result.payload as IResponseComments;
        expect(comments).toEqual(mockComments);
    });

    it("should dispatch rejected action on request failure", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Error"));

        const dispatch = jest.fn();
        const thunk = fetchComments({ limit: 10, skip: 0 });

        await thunk(dispatch, () => ({}), undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: "comments/fetchComments/rejected",
            payload: { message: "Unexpected error occurred" },
        }));
    });
});

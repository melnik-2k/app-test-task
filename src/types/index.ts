export interface IComment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        id: number;
        username: string;
        fullname: string;
    };
}

export interface IResponseComments {
    comments: IComment[];
    total: number;
    skip: number;
    limit: number;
}
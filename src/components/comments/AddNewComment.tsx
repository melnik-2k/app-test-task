import { FC, useState } from "react";
import { Button, Stack, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { addComment } from "../../features/comments/commentsSlice";
import { useTypedDispatch } from "../../store/hooks";
import { IComment } from "../../types";

export const AddNewComment: FC = () => {
    const dispatch = useTypedDispatch();
    const [bodyComment, setBodyComment] = useState<string>("");

    const handleAddComment = () => {
        if(bodyComment) {
            const payload: IComment = {
                body: bodyComment,
                user: {
                    id: 1000,
                    fullName: "root",
                    username: "admin"
                },
                likes: 0,
                postId: 100,
                id: Date.now(),
            };

            dispatch(addComment(payload));
            setBodyComment("");
        }
    }

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: 1 }}>
                <TextField
                    label="New Comment"
                    variant="outlined"
                    value={bodyComment}
                    onChange={(e) => setBodyComment(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                    sx={{height: "55px"}}
                    aria-label="send comment"
                >
                    <SendIcon/>
                </Button>
            </Stack>
        </>
    );
};

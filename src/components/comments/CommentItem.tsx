import { FC} from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import { deleteComment } from "../../features/comments/commentsSlice";
import { useTypedDispatch } from "../../store/hooks";
import { IComment } from "../../types";

interface ICommentItemProps {
    comment: IComment;
}

export const CommentItem: FC<ICommentItemProps> = (
    {comment: {id, body, likes, user}}
) => {
    const dispatch = useTypedDispatch();
    const handleDelete = () => dispatch(deleteComment(id));

    return (<Card
        variant="outlined"
        sx={{
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f9f9f9",
            transition: "0.3s", "&:hover": {
                boxShadow: 6,
            },
        }}
    >
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    {body}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <ThumbUpAltIcon color="primary"/>
                    <Typography sx={{fontSize: 20}} variant="body1" color="text.primary">
                        <strong>{likes}</strong>
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    От: <strong>{user.fullName}</strong> (@{user.username})
                </Typography>
                <IconButton
                    onClick={handleDelete}
                    color="error"
                    sx={{
                        "&:hover": {
                            backgroundColor: "rgba(255, 0, 0, 0.1)",
                        },
                    }}
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </CardContent>
    </Card>);
};

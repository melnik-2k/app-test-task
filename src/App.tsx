import { CommentList} from "./components/comments/CommentList";
import { Container, Typography } from "@mui/material";

export const App = () => {
  return (
    <div>
        <Container maxWidth="sm">
            <Typography
                component="h1"
                variant="h2"
                textAlign="center"
                gutterBottom
            >
                Comments
            </Typography>
            <CommentList />
        </Container>
    </div>
  )
};
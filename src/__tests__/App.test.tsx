import { render, screen } from "@testing-library/react";
import { App } from "../App";

jest.mock("../components/comments/CommentList", () => ({
    CommentList: jest.fn(() => <div>Mock Comment List</div>),
}));

describe("App Component: ", () => {
    test("renders the heading", () => {
        render(<App />);

        const headingElement = screen.getByText(/comments/i);
        expect(headingElement).toBeInTheDocument();
    });

    test("renders CommentList component", () => {
        render(<App />);

        const commentListElement = screen.getByText(/mock comment list/i);
        expect(commentListElement).toBeInTheDocument();
    });
});

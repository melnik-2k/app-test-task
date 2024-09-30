import { render, screen } from '@testing-library/react';
import { App } from "../App";

describe('Component App: ', () => {
    test('renders correctly', () => {
        render(<App />);
        const element = screen.getByText(/app test task/i);
        expect(element).toBeInTheDocument();
    })
})


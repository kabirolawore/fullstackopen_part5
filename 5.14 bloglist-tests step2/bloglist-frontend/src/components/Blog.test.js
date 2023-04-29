import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test("renders blog's title and author", () => {
  const blog = {
    title: 'Testing new title',
    author: 'Testing new author',
    url: 'testingnewurl.com',
    likes: 2,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blogHeading');

  expect(div).toHaveTextContent('Testing new title');
  expect(div).toHaveTextContent('Testing new author');
  expect(div).not.toHaveTextContent('testingnewurl.com');
  expect(div).not.toHaveTextContent(2 && '2');
});

test("Clicking the 'view' button renders blog's url and number of likes", async () => {
  const blog = {
    title: 'Testing new title',
    author: 'Testing new author',
    url: 'testingnewurl.com',
    likes: 2,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} toggleFn={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');

  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

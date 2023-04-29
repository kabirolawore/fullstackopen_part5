import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
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

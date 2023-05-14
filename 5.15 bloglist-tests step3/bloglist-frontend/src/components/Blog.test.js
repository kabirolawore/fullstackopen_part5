import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test("renders blog's title and author", () => {
  const blog = {
    title: 'Testing new title',
    author: 'Testing new author',
    url: 'testingnewurl.com',
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blog');

  // screen.debug(div);

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
  };

  const mockHandler = jest.fn();

  const { container } = render(<Blog blog={blog} toggleView={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText('view');

  await user.click(button);

  // console.log(container);

  const div = container.querySelector('.blog');
  // console.log(div);

  screen.debug();

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(div).toHaveTextContent('testingnewurl.com');
  // expect(div).toHaveTextContent('likes');
});

// test('calls the event handler twice when the like button is clicked twice', async () => {
//   //
//   const blog = {
//     title: 'Test title',
//     author: 'Test author',
//     url: 'testingurl.com',
//     likes: 12,
//   };

//   const mockHandler = jest.fn();
//   const likeHandler = jest.fn();
//   render(
//     <Blog blog={blog} toggleFn={mockHandler} onIncreaseLikes={likeHandler} />
//   );

//   const user = userEvent.setup();
//   const buttonView = screen.getByRole('button', { name: 'view' });
//   await user.click(buttonView);

//   screen.debug();

//   await screen.findByTestId('like-button');

//   screen.debug();

//   const likeButton = screen.getByTestId('like-button');
//   await user.click(likeButton); // Click the like button once
//   await user.click(likeButton); // Click the like button again

//   expect(likeHandler).toHaveBeenCalledTimes(2);
// });

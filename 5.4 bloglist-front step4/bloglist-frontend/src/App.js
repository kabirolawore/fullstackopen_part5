import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    // console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.Token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      // console.log(user);
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    // remove user from localStorage and log out the user
    window.localStorage.removeItem('loggedBlogAppUser');

    // Redirect the user to the login page
    window.location.href = '/login';
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
      console.log(returnedBlog);
      if (returnedBlog.title) {
        setSuccessMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    });
  };

  const addBlogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:{' '}
        <input
          // type='text'
          value={newTitle}
          // name='newTitle'
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          // type='text'
          value={newAuthor}
          // name='newAuthor'
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          // type='text'
          value={newUrl}
          // name='newUrl'
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  );

  const LoginForm = () => (
    <div>
      <h2>Log in to Application</h2>
      <Notification className='error' message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          username{' '}
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );

  return (
    <div>
      {!user && LoginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification className='success' message={successMessage} />
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <h2>create new</h2>
          {addBlogForm()}
          <br />
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

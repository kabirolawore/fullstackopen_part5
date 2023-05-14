import { useState } from 'react';

const Blog = ({
  blog,
  user,
  updateLikes,
  deleteBlog,
  setBlogs,
  blogs,
  toggleView,
  onIncreaseLikes,
}) => {
  //
  const [detailVisible, setDetailVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    color: 'green',
    marginBottom: 5,
  };

  const hideWhenNoDetail = { display: detailVisible ? 'none' : '' };
  const showWhenDetail = { display: detailVisible ? '' : 'none' };

  const buttonStyle = {
    backgroundColor: '#4dabf7',
    borderRadius: '10%',
  };

  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      updateLikes(blog.id, updatedBlog);
      setLikes((likes) => likes + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}? by ${blog.author}`))
      try {
        deleteBlog(blog.id) && setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.log(error);
      }
  };

  const toggleDetails = () => {
    // setIsHidden((isHidden) => !isHidden);
    setDetailVisible(true);
  };
  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenNoDetail}>
        {blog.title} {blog.author}{' '}
        <button id='view-button' onClick={() => toggleView(toggleDetails)}>
          view
        </button>
      </div>
      {detailVisible && (
        <div style={showWhenDetail}>
          {blog.title} {blog.author}{' '}
          <button id='hide-button' onClick={() => setDetailVisible(false)}>
            hide
          </button>
          <div>{blog.url}</div>
          <div>
            likes {likes}{' '}
            <button
              id='like-button'
              onClick={() => onIncreaseLikes(handleLikes)}
            >
              likes
            </button>
          </div>
          <div>{blog.user?.name ? blog.user.name : user}</div>
          {blog.user?.name === user ? (
            <button onClick={handleDelete} style={buttonStyle}>
              remove
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;

// import { useState } from 'react';

// //
// const Blog = ({
//   blog,
//   user,
//   updateLikes,
//   deleteBlog,
//   setBlogs,
//   blogs,
//   toggleFn,
//   onIncreaseLikes,
// }) => {
//   //
//   const [isHidden, setIsHidden] = useState(true);
//   const [likes, setLikes] = useState(blog.likes || 0);

//   const blogStyle = {
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     color: 'green',
//     marginBottom: 5,
//   };

//   const buttonStyle = {
//     backgroundColor: '#4dabf7',
//     borderRadius: '10%',
//   };

//   const handleLikes = () => {
//     const updatedBlog = {
//       ...blog,
//       likes: blog.likes + 1,
//     };

//     try {
//       updateLikes(blog.id, updatedBlog);
//       setLikes((likes) => likes + 1);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = () => {
//     if (window.confirm(`Remove blog ${blog.title}? by ${blog.author}`))
//       try {
//         deleteBlog(blog.id) && setBlogs(blogs.filter((b) => b.id !== blog.id));
//       } catch (error) {
//         console.log(error);
//       }
//   };

//   const toggleDetails = () => {
//     setIsHidden((isHidden) => !isHidden);
//   };

//   return (
//     <div style={blogStyle} className='blog'>
//       {isHidden ? (
//         <div>
//           {blog.title} {blog.author}{' '}
//           <button id='view-button' onClick={() => toggleFn(toggleDetails)}>
//             {isHidden ? 'view' : 'hide'}
//           </button>
//         </div>
//       ) : (
//         <div>
//           {blog.title} {blog.author}{' '}
//           <button id='view-button' onClick={() => toggleFn(toggleDetails)}>
//             {isHidden ? 'view' : 'hide'}
//           </button>
//           <div>{blog.url}</div>
//           <div>
//             likes {likes}{' '}
//             <button
//               id='like-button'
//               onClick={() => onIncreaseLikes(handleLikes)}
//             >
//               likes
//             </button>
//           </div>
//           <div>{blog.user.name ? blog.user.name : user}</div>
//           {blog.user.name === user ? (
//             <button onClick={handleDelete} style={buttonStyle}>
//               remove
//             </button>
//           ) : (
//             ''
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blog;

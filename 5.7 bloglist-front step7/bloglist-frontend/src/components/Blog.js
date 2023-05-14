import { useState } from 'react';

//
const Blog = ({ blog }) => {
  // const [detailVisible, setDetailVisible] = useState(false);

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   color: 'green',
  //   marginBottom: 5,
  // };
  // // console.log(blog);

  // const hideWhenNoDetail = { display: detailVisible ? 'none' : '' };
  // const showWhenDetail = { display: detailVisible ? '' : 'none' };

  // return (
  //   <div style={blogStyle}>
  //     <div style={hideWhenNoDetail}>
  //       {blog.title} {blog.author}{' '}
  //       <button onClick={() => setDetailVisible(true)}>view</button>
  //     </div>
  //     <div style={showWhenDetail}>
  //       {blog.title} {blog.author}{' '}
  //       <button onClick={() => setDetailVisible(false)}>hide</button>
  //       <div>{blog.url}</div>
  //       <div>{blog.likes}</div>
  //       <div>{blog.user.name}</div>
  //     </div>
  //   </div>
  // );

  const [isHidden, setIsHidden] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    color: 'green',
    marginBottom: 5,
  };
  // console.log(blog);

  const toggleDetails = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleDetails}>{isHidden ? 'view' : 'hide'}</button>
      </div>
      {!isHidden && (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} <button>likes</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;

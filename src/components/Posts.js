
import * as React from 'react';

import {fetchPosts, fetchAuthor} from './getData'

const {useState, useEffect, useContext, createContext} = React;

const PostsContext = createContext();

function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [data, toggle] = useState('');

  const getAuthorData = (id) => {
    fetchAuthor(id).then((data) => {
      if(data === undefined) return;

      console.log(typeof(data));
      console.log(data);
      toggle(data);
    });
  };

  useEffect(() => {
    fetchPosts().then(p => {
      setPosts(p || 'Couldn\'t receive posts');
    })
  }, []);

  return (
    <PostsContext.Provider value={{data, toggle}}>
    {props.children}
    {
      typeof(posts) === 'string' ?
      <h1>{posts}</h1>
      :
      <table align='center'>
      {
        posts.map((p,i) => 
          <tbody key={i}>
            <tr className='typeEmphasize'><td>ID:</td><td>{p.id}</td></tr>
            <tr className='pointer' onClick={() => getAuthorData(p.userId)}><td>UserId: </td><td>{p.userId}</td></tr> 
            <tr className='pointer' onClick={() => toggle({body:p.body})}><td>Title: </td><td>{p.title}</td></tr>
          </tbody>
        )
      }
      </table>
    }
    </PostsContext.Provider>
  );
};

const  Modal = ({children}) => {
  const {data} = useContext(PostsContext);
  return data ? 
    <div className='modalCoverResponsive modalCover_dark'>
      <div className='modal'>
        <div style={{backgroundColor:'#ffffff'}}>
          {children}
        </div>
      </div>
    </div> 
    : 
    null;
};

Posts.Modal = Modal;

function ContentObj ({children, data}) {
  return (
    <div className='container'>
    {children}
    {
      Object.keys(data).map((c,i) => {
        if(typeof data[c] === 'object') {
          return (
            <ContentObj data={data[c]}>
              <h3>{c}</h3>
            </ContentObj>
          )
        }
        return (
          <div key = {i} className='child'>
            <div>{`${c}`}</div>
            <div>{`${data[c]}`}</div>
          </div>
        )
      })
    }
    </div>
  );
};

const Content = () => {
  const {data} = useContext(PostsContext);
  return (
    <div className={'pal'}>
      <ContentObj data={data}>
        <h2>Data</h2>
      </ContentObj>
    </div>
  );
};

Posts.Content = Content;

const Button = () => {
  const {toggle} = useContext(PostsContext);
  const close = () => toggle('');

  return <div className={'pal'}><button onClick = {close}>Close</button></div>
};

Posts.Button = Button;

export default function PostsUsage() {

  return (
    <Posts>
      <Posts.Modal>
        <Posts.Content />
        <Posts.Button />
      </Posts.Modal>
    </Posts>
  );
};

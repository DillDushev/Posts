import axios from 'axios';

export function fetchPosts() {
  return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(({data}) => {
      return data;
    })
    .catch(err => {
      console.log('error', err);
    });
};

export function fetchAuthor(authorId) {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${authorId}`)
    .then(({data}) => {
      return data;
    })
    .catch(err => {
      console.log('error fetchAuthor', err);
    });
};
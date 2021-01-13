import * as React from 'react';
import axios from 'axios';
const {useState, useEffect, useRef} = React;

const fetchRandomData = (pageNumber) => {
  return   axios.get(`https://randomuser.me/api?page=${pageNumber}`)
  .then(({data}) => {
    console.log('data', data);
    return data;
  })
  .catch(err => {
    console.log('error', err);
  })
};

const getFullUserName = (userInfo) => {
  console.log(userInfo)
  const {name: {first, last}} = userInfo;
  return `name: ${first} ${last}`;
};

export default function Interview () {

  const [counter, setCounter] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [, setRandomData] = useState('');
  const [userInfo, setUserInfo] = useState([]);

  const fetchNextUser = useRef(()=> {});

  fetchNextUser.current = () => {
    fetchRandomData(nextPageNumber).then(data => {
      setRandomData(JSON.stringify(data, null, 2) || 'No random data were found');
      if(data === undefined) return;
      const newData = [
        ...userInfo,
        data.results[0]
      ];
      setUserInfo(newData);
      setNextPageNumber(data.info.page +1);
    });
  //}, []);
  };

  useEffect(() => {
    //fetchNextUser();
    fetchNextUser.current();
  }, []); 

  return (
    <div className = 'App'>
      <h1>Welcome to Sandbox</h1>
      <h2>Start editing to see some magic happen</h2>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)} >Increase Counter</button>
      <button onClick={() => fetchNextUser.current()} >Fetch next user</button>
      {
        userInfo.map((info, idx) => 
          <div key={idx}>
            <p>{getFullUserName(info)}</p>
            <img src = {info.picture.thumbnail} alt={''}/>
          </div>
        )
      }
    </div>
  );
};

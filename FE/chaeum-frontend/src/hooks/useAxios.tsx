import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Props = {
  requestMethod: RequestMethod;
  initialUrl: string;
};

const useAxios = (props: Props) => {
  const [url, setUrl] = useState(props.initialUrl);

  const [data, setData] = useState('');

  const getData = () => axios.get(url).then(({ data }) => setData(data));
  const postData = () => axios.post(url).then(({ data }) => setData(data));
  const putData = () => axios.put(url).then(({ data }) => setData(data));
  const deleteData = () => axios.put(url).then(({ data }) => setData(data));

  if (props.requestMethod === 'GET') {
    getData();
  }else if(props.requestMethod === 'POST'){
    postData();
  }else if(props.requestMethod === 'PUT'){
    putData();
  }else{
    deleteData();
  }
  
  return [data];
};

export default useAxios;

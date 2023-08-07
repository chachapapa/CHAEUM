import React from 'react';
import { useEffect } from 'react';
import AnimatedLogo from '../components/common/AnimatedLogo';
import TextButton from '../components/common/TextButton';
import ActiveInfoCard from '../components/active/ActiveInfoCard';
import { useSearchParams } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from 'axios';
import { ChaeumNav } from '../components/common/ChaeumNav';

/*
  feature/#256
  EntrancePage.tsx 에서 파일명만 바꿨습니다.
*/
const ACCESS_TOKEN_URL = 'http://i9a810.p.ssafy.io:8080/api/token';

const MainPage = () => {

  //이후 쿠키 가져올 때 사용할 코드
  // const getCookie= (key:string) => {
  //   let result = null;
  //   const cookie = document.cookie.split(';');
  //   cookie.some( (item) : boolean => {
  //     item = item.replace(' ', '');

  //     const  dic = item.split('=');

  //     if(key === dic[0]) {
  //       result = dic[1];
  //       return true;
  //     }else{
  //       return false;
  //     }

  //   });
  //   return result;
  // };

  // console.log('함수로 가져오기'+ getCookie('refresh_token'));

  // const [cookie, setCookie] = useCookies(['__stripe_mid']);

  // console.log('그냥다큐먼트 내부 쿠키'+ document.cookie);

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');

  //로컬스토리지에 토큰 저장하기.
  if (token) {
    localStorage.setItem('access_token', token);
  }
  return (
    <div className="w-full h-full flex flex-col justify-between items-end outline">
      <ActiveInfoCard />
      <ChaeumNav/>
    </div>
  );
};

export default MainPage;

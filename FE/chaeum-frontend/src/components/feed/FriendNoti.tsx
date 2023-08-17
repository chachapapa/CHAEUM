import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import TextButton from '../common/TextButton';

type nameListType = {
  nickname: string;
  profileUrl: string;
};

export const FriendNoti = () => {
  // 1. 나한테 친구 신청을 한 사람 리스트 가져오기
  const AccessToken = localStorage.getItem('access_token');
  type UrlObjType = {
    [key in string]: string;
  };

  const url: UrlObjType = {
    APPLY_LIST_URL: 'http://i9a810.p.ssafy.io:8080/api/user/add/list', // GET
    APPLY_ACCEPT_URL: 'http://i9a810.p.ssafy.io:8080/api/user/accept', // POST
    APPLY_REJECT_URL: 'http://i9a810.p.ssafy.io:8080/api/user/reject', // PATCH
    USER_INFO_URL: 'http://i9a810.p.ssafy.io:8080/api/user/nickname-search', // GET
  };

  // const [nameList, setNameList] = useState<string[]>([]);
  const [applyList, setApplyList] = useState<nameListType[]>([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    axios
      .get(`${url.APPLY_LIST_URL}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      })
      .then(res => {
        setApplyList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      axios
        .get(`${url.APPLY_LIST_URL}`, {
          headers: { Authorization: `Bearer ${AccessToken}` },
        })
        .then(res => {
          setApplyList(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const onRejectButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    rejectApply(e.currentTarget.value);
  };

  const rejectApply = (value: string) => {
    axios
      .patch(
        `${url.APPLY_REJECT_URL}`,
        { nickname: value },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        alert(
          value +
            ' 님의 친구 요청을 거절했어요😥\n거절 알림은 가지 않으니 안심하세요! \n추후 다시 요청이 올 수는 있어요.'
        );
      })
      .then(res => {
        setRender(!render);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onAcceptButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    acceptApply(e.currentTarget.value);
  };

  const acceptApply = (value: string) => {
    axios
      .post(
        `${url.APPLY_ACCEPT_URL}`,
        { nickname: value },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        alert(value + ' 님의 친구 요청을 수락했어요.\n오늘부터 1일 💕');
      })
      .then(res => {
        setRender(!render);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const goProfile = (nickname: string) => {
    window.location.replace(`/profile/${nickname}`);
  };

  return (
    <div className=" max-h-[200px] pb-2 overflow-scroll">
      {applyList.length === 0 ? (
        <div className="text-sm text-chaeum-gray-900">
          참 잘했어요👍 <br />
          모든 친구 요청을 다 처리했어요!
        </div>
      ) : (
        applyList.map((info, idx) => (
          <>
            {idx !== 0 ? <hr /> : null}
            <div
              key={idx}
              className="grid grid-cols-[1fr_4fr_3fr] justify-items-center items-center py-2"
            >
              {/* <div
              key={idx}
              className="flex flex-row justify-between items-center p-2"
            > */}
              <img
                className="relative inline-block h-6 w-6 rounded-full object-cover object-center hover:cursor-pointer"
                alt="placeholder"
                src={info.profileUrl}
                onClick={() => goProfile(info.nickname)}
              />
              <div className="text-xs text-start pr-1 justify-self-start px-1 ">
                <span className="font-bold">{info.nickname} </span>님의
                <div>친구신청을 받아주세요!</div>
              </div>
              <div className="flex flex-row justify-self-end ">
                <button
                  className="px-2 h-[25px] rounded-lg text-xs text-center text-chaeum-gray-900 bg-chaeum-gray-300 m-1 active:bg-chaeum-gray-700"
                  value={info.nickname}
                  onClick={onRejectButtonClick}
                >
                  거절
                </button>
                <button
                  className="px-2 h-[25px] rounded-lg text-xs text-center text-chaeum-gray-900 bg-chaeum-blue-500 m-1 active:bg-chaeum-blue-800"
                  value={info.nickname}
                  onClick={onAcceptButtonClick}
                >
                  수락
                </button>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

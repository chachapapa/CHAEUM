import React, { useEffect, useState } from 'react';
import InputTag from './InputTag';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Input, Option, Select } from '@material-tailwind/react';
import ColorContainer from './ColorContainer';
import TextButton from './TextButton';
import { useDispatch } from 'react-redux';
import {
  closeModal,
  openModal,
  setMyStreakInfo,
} from '../../features/states/states';
import { Tag } from './Tag';
import axios from 'axios';
import { getCategory } from '../main/StreakCategoryList';

type ModalType = {
  categoryList: string[];
};

type ParamsType = {
  categoryMain: string;
  categoryMiddle: string;
  streakName: string;
  streakColor: string;
  tagList: string[];
};

type ModiType = {
  streakId: number;
  streakName: string;
  streakColor: string;
  tagList: string[];
};

export const OverlayModal = ({ ...props }: ModalType) => {
  const { modalState } = useAppSelector(state => state.stateSetter);
  const dispatch = useDispatch();

  // 창을 열기 위한 state
  const [goCreate, setGoCreate] = useState(false);
  const [goModify, setGoModify] = useState(false);

  // (생성 시) 포스트 요청으로 보낼 파라미터
  const [postParams, setPostParams] = useState<ParamsType>({
    categoryMain: modalState.mainCategory,
    categoryMiddle: modalState.mainCategory === '기타' ? '기타' : '',
    streakName: '',
    streakColor: '',
    tagList: [],
  });

  // (수정) 수정 전 스트릭 정보 저장하기
  const [patchParams, setPatchParams] = useState<ModiType>({
    streakId: 0,
    streakName: '',
    streakColor: ' ',
    tagList: [],
  });

  useEffect(() => {
    if (modalState.streakInfo !== undefined) {
      setPatchParams({
        streakId: modalState.streakInfo?.streakId,
        streakName: modalState.streakInfo?.streakName,
        streakColor: modalState.streakInfo?.streakColor,
        tagList: modalState.streakInfo?.tagList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 사용자 입력 해시태그
  const [hashtag, setHashtag] = useState<string>(''); // 단일 해시태그 입력받기

  const AccessToken = localStorage.getItem('access_token');

  // axios 테스트
  type UrlObjType = {
    [key in string]: string;
  };

  const url: UrlObjType = {
    CREATE_STREAK_URL: 'http://i9a810.p.ssafy.io:8080/api/streak',
    MODIFY_STREAK_URL: 'http://i9a810.p.ssafy.io:8080/api/streak/modification',
  };

  // 스트릭 제목
  const handleInputValueChange = (newValue: string) => {
    if (modalState.modalType === 'create') {
      setPostParams(prevState => {
        const newParams = { ...prevState };
        newParams.streakName = newValue;
        return newParams;
      });
    } else {
      setPatchParams(prevState => {
        const newParams = { ...prevState };
        newParams.streakName = newValue;
        return newParams;
      });
    }
  };

  // 스트릭 컬러
  const handleColor = (value: string) => {
    if (modalState.modalType === 'create') {
      setPostParams(prevState => {
        const newParams = { ...prevState };
        newParams.streakColor = value;
        return newParams;
      });
    } else {
      setPatchParams(prevState => {
        const newParams = { ...prevState };
        newParams.streakColor = value;
        return newParams;
      });
    }
  };

  const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target as HTMLInputElement;
    if (regExp.test(value)) {
      value = value.replace(regExp, '');
    }
    setHashtag(value);
  };

  // 엔터를 눌렀을 때 데이터와 화면에 해시태그 정보 저장
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // const { value } = e.target as HTMLInputElement;
    if (hashtag.length !== 0 && (e.key === 'Enter' || e.keyCode === 32)) {
      if (modalState.modalType === 'create') {
        setPostParams(prevState => {
          const newParams = { ...prevState };
          newParams.tagList = [...prevState.tagList, hashtag];
          setHashtag('');
          return newParams;
        });
      } else {
        setPatchParams(prevState => {
          const newParams = { ...prevState };
          newParams.tagList = [...prevState.tagList, hashtag];
          setHashtag('');
          return newParams;
        });
      }
    }
  };

  const removeTag = (tag: string) => {
    if (modalState.modalType === 'create') {
      setPostParams(prevState => {
        const newParams = { ...prevState };
        newParams.tagList = prevState.tagList.filter(item => item !== tag);
        return newParams;
      });
    } else {
      setPatchParams(prevState => {
        const newParams = { ...prevState };
        newParams.tagList = prevState.tagList.filter(item => item !== tag);
        return newParams;
      });
    }
  };

  const [msg, setMsg] = useState(false);

  const createStreak = () => {
    if (postParams.categoryMiddle.length === 0) {
      setMsg(true);
    } else {
      // axios로 요청 날리기
      axios
        .post(`${url.CREATE_STREAK_URL}`, JSON.stringify(postParams), {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          axios
            .get(`${url.CREATE_STREAK_URL}`, {
              // params: { nickname: nickname },
              headers: { Authorization: `Bearer ${AccessToken}` },
            })
            .then(res => {
              if (res.data) {
                dispatch(setMyStreakInfo(res.data));
              } else {
                alert('문제있음');
              }
            });
        });

      setGoCreate(true);
      setTimeout(() => {
        dispatch(closeModal());
        setGoCreate(false);
        setMsg(false);
      }, 1500);
    }
  };

  const modifyStreak = () => {
    // axios로 요청 날리기

    console.log(JSON.stringify(patchParams));
    axios
      .patch(`${url.MODIFY_STREAK_URL}`, JSON.stringify(patchParams), {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        axios
          .get(`${url.CREATE_STREAK_URL}`, {
            // params: { nickname: nickname },
            headers: { Authorization: `Bearer ${AccessToken}` },
          })
          .then(res => {
            if (res.data) {
              dispatch(setMyStreakInfo(res.data));
            } else {
              alert('문제있음');
            }
          });
      })
      .catch(err => {
        console.log(err);
      });

    setGoModify(true);
    setTimeout(() => {
      dispatch(closeModal());
      setGoCreate(false);
      setMsg(false);
    }, 1500);

    // 창닫기
  };

  const colorArr = [
    {
      name: 'red',
      color: 'bg-red-400',
    },
    {
      name: 'orange',
      color: 'bg-orange-400',
    },
    {
      name: 'amber',
      color: 'bg-amber-400',
    },
    {
      name: 'yellow',
      color: 'bg-yellow-400',
    },
    {
      name: 'lime',
      color: 'bg-lime-400',
    },
    {
      name: 'green',
      color: 'bg-green-400',
    },
    {
      name: 'emerald',
      color: 'bg-emerald-400',
    },
    {
      name: 'teal',
      color: 'bg-teal-400',
    },
    {
      name: 'cyan',
      color: 'bg-cyan-400',
    },
    {
      name: 'chaeumblue',
      color: 'bg-chaeum-blue-400',
    },
    {
      name: 'sky',
      color: 'bg-sky-400',
    },
    {
      name: 'blue',
      color: 'bg-blue-400',
    },
    {
      name: 'indigo',
      color: 'bg-indigo-400',
    },
    {
      name: 'violet',
      color: 'bg-violet-400',
    },
    {
      name: 'purple',
      color: 'bg-purple-400',
    },
    {
      name: 'fuchsia',
      color: 'bg-fuchsia-400',
    },
    {
      name: 'pink',
      color: 'bg-pink-400',
    },
    {
      name: 'rose',
      color: 'bg-rose-400',
    },
    {
      name: 'slate',
      color: 'bg-slate-400',
    },
  ];

  const streakPlus = (category: '운동' | '공부' | '기타' | '') => {
    //스트릭 추가 페이지
    if (modalState.isModalOpen) dispatch(closeModal());
    else
      dispatch(
        openModal({
          isModalOpen: true,
          modalType: 'create',
          mainCategory: category,
        })
      );
  };

  return (
    <div className="fixed flex flex-2 justify-center items-center flex-col shrink-0 inset-0 w-full h-full pointer-events-auto z-[9995] bg-chaeum-gray-300 bg-opacity-60 backdrop-blur-lg transition-all duration-300">
      <div className="w-[46.15vh] flex flex-col justify-center items-center">
        <span className="font-bold text-2xl m-8 w-full">
          {modalState.modalType === 'create'
            ? '스트릭 생성하기'
            : '스트릭 수정하기'}
        </span>
        <div className="w-full flex flex-col">
          <span className="text-start m-1 text-sm text-chaeum-gray-900">
            스트릭 이름
          </span>
          {modalState.modalType === 'create' ? (
            <InputTag
              label="스트릭 이름을 입력하세요."
              width="w-full mb-5"
              for="streakName"
              onChange={handleInputValueChange}
            />
          ) : (
            <InputTag
              value={patchParams.streakName}
              width="w-full mb-5"
              for="streakName"
              onChange={handleInputValueChange}
            />
          )}
          <span className="text-xs">&nbsp;</span>
        </div>

        {modalState.mainCategory !== '기타' && (
          <div className=" flex flex-col w-full mb-5">
            <div className="w-full flex flex-col">
              {modalState.modalType === 'create' ? (
                <>
                  <span className="text-start m-1 text-sm text-chaeum-gray-900">
                    중분류
                  </span>
                  <Select
                    placeholder="중분류를 선택하세요."
                    className={
                      'h-10 bg-white w-full bg-opacity-50 border-[1px] focus:border-2 border-chaeum-gray-500/80 focus:border-blue-500'
                    }
                    selected={element => {
                      if (element) {
                        postParams.categoryMiddle = element.props.value;
                        return element.props.value;
                      }
                    }}
                  >
                    {props.categoryList.map((category, idx) => (
                      <Option key={idx} value={category}>
                        {category}
                      </Option>
                    ))}
                  </Select>
                  {msg ? (
                    <span className="px-2 mt-2 flex items-center gap-1 font-bold text-xs text-red-600">
                      중분류는 꼭 입력해주세요 (ToT)/~~~
                    </span>
                  ) : (
                    <span className="px-2 mt-2 flex items-center gap-1 font-normal text-xs text-chaeum-gray-700">
                      중분류를 꼭 입력해주세요 （⊙ｏ⊙）
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-start m-1 text-sm text-chaeum-gray-600">
                    중분류는 수정할 수 없어요!
                  </span>
                  <span className="w-full h-full bg-transparent bg-white bg-opacity-20 text-chaeum-gray-700 font-sans font-normal border-1 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 text-left">
                    {modalState.streakInfo &&
                      getCategory(modalState.streakInfo?.categoryId)
                        .middleCategory}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        <div className="w-full flex flex-col">
          <span className="text-start m-1 text-sm text-chaeum-gray-900">
            태그
          </span>
          <div className="flex flex-col flex-wrap justify-left items-start w-full">
            {modalState.modalType === 'create' ? (
              postParams.tagList.length === 0 ? null : (
                <div className="pb-2">
                  <div className="HashWrapOuter flex flex-row flex-wrap">
                    {postParams.tagList.map((tag, idx) => {
                      return (
                        <button key={idx} onClick={() => removeTag(tag)}>
                          <Tag tag={tag} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            ) : (
              patchParams?.tagList.length !== 0 && (
                <div className="pb-2">
                  <div className="HashWrapOuter flex flex-row flex-wrap">
                    {patchParams?.tagList.map((tag, idx) => {
                      return (
                        <button key={idx} onClick={() => removeTag(tag)}>
                          <Tag tag={tag} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            )}

            <Input
              type="text"
              placeholder="태그 입력 후 엔터를 눌러주세요"
              className="!border-t-blue-gray-200 focus:!border-t-blue-500 font-sans grow !m-0 bg-white bg-opacity-50 w-full"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              value={hashtag}
              onChange={onChangeTag}
              onKeyDown={onKeyUp}
            />
            <span className="px-2 mt-2 flex items-center gap-1 font-normal text-xs text-chaeum-gray-700">
              특수문자는 입력할 수 없어요 &nbsp; w(ﾟДﾟ)w
            </span>
          </div>
        </div>
        <br />
        <div className="w-full flex flex-col">
          <span className="text-start m-1 text-sm text-chaeum-gray-700">
            색상
          </span>
          <div className="flex w-full overflow-auto overflow-y-hidden">
            {colorArr.map((container, idx) => (
              <ColorContainer
                key={idx}
                defaultChecked={
                  patchParams.streakColor === container.name ? true : false
                }
                value={container.name}
                color={container.color}
                handleColor={handleColor}
              />
            ))}
          </div>
        </div>
        <div className="transition-all duration-300 opacity-100 w-full my-8">
          <div className="buttons flex flex-col w-full justify-center items-center gap-y-5">
            {modalState.modalType === 'create' ? (
              <TextButton
                label="생성하기"
                type="primary"
                className="h-12 w-full"
                callback={createStreak}
              />
            ) : (
              <TextButton
                label="수정하기"
                type="primary"
                className="h-12 w-full"
                callback={modifyStreak}
              />
            )}

            <TextButton
              label="취소하기"
              type="gray"
              className="h-12 w-full text-chaeum-gray-900 text-center justify-items-center"
              callback={() => streakPlus('')}
            />
          </div>
          {modalState.modalType === 'create' ? (
            <div className="text-center my-4 p-2 rounded-lg transition-all duration-500 w-full">
              {goCreate ? (
                <span className="bg-chaeum-blue-700 bg-opacity-70 p-2 text-xs text-white rounded-lg transition-all duration-500  w-full">
                  {modalState.mainCategory} 카테고리에 새로운 스트릭을
                  만들었어요!
                </span>
              ) : (
                <span className="transition-all duration-500 bg-white bg-opacity-0 text-opacity-0 text-white invisible">
                  {modalState.mainCategory} 카테고리에 새로운 스트릭을
                  만들었어요!
                </span>
              )}
            </div>
          ) : (
            <div className="text-center my-4 p-2 rounded-lg transition-all duration-500 w-full">
              {goModify ? (
                <span className="bg-chaeum-blue-700 bg-opacity-70 p-2 text-xs text-white rounded-lg transition-all duration-500  w-full">
                  '{patchParams.streakName}' 스트릭을 수정했어요!
                </span>
              ) : (
                <span className="transition-all duration-500 bg-white bg-opacity-0 text-opacity-0 text-white invisible">
                  '{patchParams.streakName}' 스트릭을 수정했어요!
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

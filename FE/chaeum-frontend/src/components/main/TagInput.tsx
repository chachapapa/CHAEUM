import { Input, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Tag } from '../common/Tag';
import { wait } from '@testing-library/user-event/dist/utils';
import InputTag from '../common/InputTag';
import { useAppSelector } from '../../hooks/reduxHooks';

type ListStateType = {
  taglist: string[] | [];
};

export const TagInput = () => {
  const main = useAppSelector(
    state => state.stateSetter.modalState.mainCategory
  );

  // 1. 해시태그에 활용할 상태
  const [hashtag, setHashtag] = useState<string>(''); // 단일 해시태그 입력받기
  const [tagArr, setTagArr] = useState<string[] | []>([main]); // 전체 해시태그를 저장할 배열

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target as HTMLInputElement;
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    if (regExp.test(value)) {
      value = value.substring(0, value.length - 1);
    }

    setHashtag(value);
  };

  // 엔터를 눌렀을 때 데이터와 화면에 해시태그 정보 저장
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let { value } = e.target as HTMLInputElement;
    value = value.trim();
    if (value.length !== 0 && (e.key === 'Enter' || e.keyCode === 32)) {
      setTagArr(tagArr => [...tagArr, hashtag]);
      setHashtag('');
    }
  };

  const removeTag = (tag: string) => {
    setTagArr(tagArr.filter(item => item !== tag));
  };

  return (
    <div className="flex flex-col flex-wrap justify-left items-start w-full">
      {tagArr.length === 0 ? null : (
        <div className="pb-2">
          <div className="HashWrapOuter flex flex-row flex-wrap">
            {tagArr.map((tag, idx) => {
              return (
                <button key={idx} onClick={() => removeTag(tag)}>
                  <Tag tag={tag} />
                </button>
              );
            })}
          </div>
        </div>
      )}
      <Input
        type="text"
        placeholder="태그 입력 후 엔터를 눌러주세요"
        className="!border-t-blue-gray-200 focus:!border-t-blue-500 font-sans grow !m-0 bg-white w-full bg-opacity-50 w-full"
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        value={hashtag}
        onChange={onChangeTag}
        onKeyDown={onKeyUp}
      />
      {/* </div> */}
      <span className="px-2 mt-2 flex items-center gap-1 font-normal text-xs text-chaeum-gray-600">
        [주의] 특수문자는 입력이 불가능합니다.
      </span>
    </div>
  );
};

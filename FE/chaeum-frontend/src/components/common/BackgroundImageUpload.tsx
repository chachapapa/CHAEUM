import React, { useEffect, useRef, useState } from 'react';
import { ColorVariation, ImageFile } from '../Types';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setBackgroundImage } from '../../features/states/states';
import { deleteBackgroundImage } from '../../features/states/states';

const BackgroundImageUpload = () => {
  // 업로드할 파일들을 담을 State!

  const backgroundImage = useAppSelector(
    state => state.stateSetter.backgroundImage
  );
  const dispatch = useAppDispatch();
  const imageInput = useRef<HTMLInputElement>(null);

  const onUploadButtonClicked = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const temp = [];
    const imageToAdd = e.target.files;
    if (imageToAdd) {
      for (let i = 0; i < imageToAdd.length; i++) {
        const tmpImageFile: ImageFile = {
          id: imageToAdd[i].name,
          file: imageToAdd[i],
          url: URL.createObjectURL(imageToAdd[i]),
        };

        temp.push(tmpImageFile);
      }
      console.log(temp);
      dispatch(setBackgroundImage(temp.concat(backgroundImage)));
    }
  };

  const uploadButton = (
    <div
      className="min-w-full min-h-[250px] bg-gray-100 rounded-lg flex flex-col justify-center"
      onClick={onUploadButtonClicked}
    >
      <i className="fa-solid fa-plus text-4xl"></i>
      <div className="mt-2">업로드</div>
    </div>
  );

  const onRemoveButtonClicked = (deleteUrl: string) => {
    dispatch(deleteBackgroundImage());
  };

  return (
    <>
      <div className="w-full flex overflow-auto">
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          ref={imageInput}
          style={{ display: 'none' }}
          onChange={e => handleImage(e)}
        />
        {backgroundImage.map(image => (
          <div
            key={image.url}
            className="relative w-full h-[200px] bg-gray-100 rounded-lg flex flex-col justify-center"
          >
            <img
              src={image.url}
              alt={image.id}
              className="w-full h-[200px] rounded-lg z-0"
            ></img>

            <div
              className="absolute z-10 w-full h-full flex items-center justify-center rounded-lg bg-black opacity-0 hover:opacity-30 transition-opacity"
              onClick={() => onRemoveButtonClicked(image.url)}
            >
              <i className="fa-solid fa-minus text-4xl text-white"></i>
            </div>
          </div>
        ))}
        {backgroundImage.length > 0 ? null : uploadButton}
      </div>
      {/* <button onClick={fileUploadHandler}>파일 업로드 하기</button> */}
    </>
  );
};

export default BackgroundImageUpload;

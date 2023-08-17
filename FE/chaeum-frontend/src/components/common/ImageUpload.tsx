import React, { useEffect, useRef, useState } from 'react';
import { ColorVariation, ImageFile } from '../Types';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setImageList } from '../../features/states/states';
import { deleteImageList } from '../../features/states/states';

type Props ={
  // imageList : ImageFile[];
}



const ImageUpload = () => {
  // 업로드할 파일들을 담을 State!

  const imageList = useAppSelector(state => state.stateSetter.imageList);
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
      dispatch(setImageList(temp.concat(imageList)));
    }
  };

  const uploadButton = (
    <div
      className="min-w-[250px] min-h-[250px] bg-gray-100 rounded-lg flex flex-col justify-center mr-5"
      onClick={onUploadButtonClicked}
    >
      <i className="fa-solid fa-plus text-4xl"></i>
      <div className="mt-2">업로드</div>
    </div>
  );

  const onRemoveButtonClicked = (deleteUrl: string) => {
    dispatch(deleteImageList(deleteUrl));
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
        {imageList.map(image => (
          <div
            key={image.url}
            className="relative min-w-[250px] min-h-[250px] bg-gray-100 rounded-lg flex flex-col justify-center mr-5"
          >
            <img
              src={image.url}
              alt={image.id}
              className="w-[250px] h-[250px] rounded-lg z-0"
            ></img>

            <div
              className="absolute z-10 w-full h-full flex items-center justify-center rounded-lg bg-black opacity-0 hover:opacity-30 transition-opacity"
              onClick={() => onRemoveButtonClicked(image.url)}
            >
              <i className="fa-solid fa-minus text-4xl text-white"></i>
            </div>
          </div>
        ))}
        {uploadButton}
      </div>
      {/* <button onClick={fileUploadHandler}>파일 업로드 하기</button> */}
    </>
  );
};

export default ImageUpload;

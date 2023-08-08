import React, { useState, MouseEvent } from 'react';
import DraggableScreen from '../components/active/DraggableScreen';
import { Outlet } from 'react-router';

const ActivePage = () => {
  return (
    <div className="w-[452px] h-[932px] bg-white outline outline-1 relative flex justify-center">
      <DraggableScreen></DraggableScreen>

      {/* 라우팅 규칙 

      app.tsx 에 수정
      <Route path="/active" element={<ActivePage />}>
          <Route index element={<DraggableScreen />}></Route>
          <Route path="result" element={<ResultPage />}></Route>
        </Route> */}

      {/* <Outlet></Outlet> */}
    </div>
  );
};

export default ActivePage;

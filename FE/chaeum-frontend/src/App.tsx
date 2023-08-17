import React, { useEffect, useState } from 'react';
import './App.css';
import ArticleCard from './components/feed/ArticleCard';
import EntrancePage from './views/EntrancePage';
import SignupPage from './views/SignupPage';
import MainPage from './views/MainPage';
import ActivePage from './views/ActivePage';
import ResultPage from './views/ResultPage';
import FeedPage from './views/FeedPage';
import FeedDetailPage from './views/FeedDetailPage';
import ChatPage from './views/ChatPage';
import ChatInitPage from './views/ChatInitPage';
import ChatRoomPage from './views/ChatRoomPage';
import ProfilePage from './views/ProfilePage';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import FeedMain from './components/feed/FeedMain';
import FeedWritePage from './components/feed/write/FeedWritePage';
import DraggableScreen from './components/active/DraggableScreen';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { setIsLogedin } from './features/states/userStates';

function App() {
  // const [isLogedin, setIsLogedin] = useState(false);
  const isLogedin = useAppSelector(state => state.userStateSetter.userStateSetter.isLogedin);
  const location = useLocation();
  
  return (
    <div className="App">
      <Routes>
        <Route path="/entrance" element={<EntrancePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/main" element={isLogedin ?<MainPage isProfilePage={false}/> : <Navigate to="/entrance" />}></Route>
        <Route
          path="/"
          element={
            isLogedin ? <Navigate to="/main" /> : <Navigate to="/entrance" />
          }
        />
        <Route path="/active" element={isLogedin? <ActivePage /> : <Navigate to="/entrance" />}>
          <Route index element={<DraggableScreen />}></Route>
          <Route path="result" element={<ResultPage />}></Route>
        </Route>
        <Route path="/feed" element={isLogedin? <FeedPage /> : <Navigate to="/entrance" />}>
          <Route index element={<FeedMain/>}/>
          <Route path="write" element={<FeedWritePage/>}></Route>
        </Route>
        <Route path="/chat" element={isLogedin? <ChatPage /> : <Navigate to="/entrance" />}>
          <Route path="init" element={<ChatInitPage />}></Route>
          <Route path=":userNickname" element={<ChatRoomPage />}></Route>
        </Route>
        <Route path="/profile/:userNickname" element={isLogedin? <ProfilePage /> : <Navigate to="/entrance" />}></Route>
      </Routes>
    </div>
  );
}

export default App;

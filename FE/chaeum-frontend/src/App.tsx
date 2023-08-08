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

function App() {
  const [isLogedin, setIsLogedin] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (sessionStorage.getItem('loginUser') !== null) {
      setIsLogedin(true);
    } else {
      setIsLogedin(false);
    }
  }, [location.pathname]);


  console.log('라우팅 시 로그인 여부' + isLogedin);
  return (
    <div className="App">
      <Routes>
        <Route path="/entrance" element={<EntrancePage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route
          path="/"
          element={isLogedin ? <Navigate to="/main" /> : <Navigate to="/entrance" />}
        />
        <Route path="/active" element={<ActivePage />}>
          <Route path="result" element={<ResultPage />}></Route>
        </Route>
        <Route path="/feed" element={<FeedPage />}>
          <Route index element={<FeedMain/>}/>
          <Route path="write" element={<FeedWritePage streakColor='blue'/>}></Route>
          <Route path=":articleId" element={<FeedDetailPage />}></Route>
        </Route>
        <Route path="/chat" element={<ChatPage />}>
          <Route path="init" element={<ChatInitPage />}></Route>
          <Route path=":userId" element={<ChatRoomPage />}></Route>
        </Route>
        <Route path="/profile/:userId" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

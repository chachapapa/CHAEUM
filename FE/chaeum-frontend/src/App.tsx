import React from 'react';
import './App.css';
import ArticleCard from './Components/ArticleCard';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        yarn berry 포기 / tailwind 사용 테스트
      </h1>
      <ArticleCard />
    </div>
  );
}

export default App;

import React from 'react';
import ArticleCard from '../../components/feed/ArticleCard';
import NewStoryCard from '../../components/feed/NewStoryCard';


const FeedMain = () => {
  return (
    <div className=" overflow-auto flex-grow">
      <div className="bg-white p-5 mt-3">
        <NewStoryCard
          nickname="chacha"
          title="제목길게에에에에에에"
          img="../chacha2.png"
          color="yellow"
          tag={['#클라이밍', '#빨주노초파남']}
          time={15}
        />
      </div>
      <ArticleCard></ArticleCard>
    </div>
  );
};

export default FeedMain;

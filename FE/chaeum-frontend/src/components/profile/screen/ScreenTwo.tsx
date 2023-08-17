import React, { useEffect, useState } from 'react';
import FeedPage from '../../../views/FeedPage';
import { Article, ColorForSelection } from '../../Types';
import EncourageMessageDetail from '../../feed/EncourageMessageDetail';
import EncourageMessageCarousel from '../../feed/EncourageMessageCarousel';
import CommentInput from '../../feed/CommentInput';
import CommentList from '../../feed/CommentList';
import { Comment } from '../../Types';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ArticleCard from '../../feed/ArticleCard';
import { API_ROUTES, getApiUrl } from '../../../apiConfig';

type Props = {
  userNickname: string;
};
// const USER_ARTICLE_LIST_URL = 'http://i9a810.p.ssafy.io:8080/api/sns/mypage';
const AccessToken = localStorage.getItem('access_token');

const ScreenTwo = ({ userNickname }: Props) => {
  const [isPlusButtonClicked, setIsPlusButtonClicked] =
    useState<boolean>(false);
  const [detailedArticle, setDetailedArticle] = useState<boolean>(false);
  const [focusedArticle, setFocusedArticle] = useState<number>();
  const [articleList, setArticleList] = useState<Article[]>([]);


  useEffect(() => {
    axios
      .get(`${getApiUrl(API_ROUTES.POST_LIST_URL)}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
        params: { nickName: userNickname },
      })
      .then(res => {
        // console.log(res);
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            const commentList: Comment[] = [];
            const encourageMessageList: Comment[] = [];

            for (let j = 0; j < res.data[i].replyList.length; j++) {
              if (res.data[i].replyList[j].cheer) {
                encourageMessageList.push(res.data[i].replyList[j]);
              } else {
                commentList.push(res.data[i].replyList[j]);
              }
            }
            const tmpArticle: Article = res.data[i];
            tmpArticle.commentList = commentList;
            tmpArticle.encourageMessageList = encourageMessageList;

            setArticleList(prevList => [...prevList, tmpArticle]);
          }
        } else {
          console.log('게시글 가져오기 실패');
        }
      });
  }, [userNickname]);

  return (
    <div>
      {articleList.length > 0 ? (
        <div className="max-w-7xl">
          <div className="w-full">
            {articleList.map((article, index) => (
              <div key={index}>
                <ArticleCard
                  article={article}
                  setArticleList={setArticleList}
                  index={article.postId}
                ></ArticleCard>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <hr></hr>
    </div>
  );
};

export default ScreenTwo;

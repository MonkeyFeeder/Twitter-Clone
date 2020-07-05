import React from 'react';

import './homepage.styles.scss';
import TweetBar from '../../components/tweet-bar/tweet-bar.component';
import NewsFeed from '../../components/news-feed/news-feed.component';

const Homepage = () => {
  return(
    <div>
      <TweetBar />
      <NewsFeed />
    </div>
  )
}

export default Homepage;
import React from 'react';

import Tweet from '../tweet/tweet.component.jsx'

import './news-feed.styles.scss';

const NewsFeed = () => {
  return(
    <div className="news-feed">
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </div>
  )
}

export default NewsFeed;
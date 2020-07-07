import React, {useState, useContext, useEffect} from 'react';

import Tweet from '../tweet/tweet.component.jsx';

import CurrentUserContext from '../../context/current-user/current-user.context';
import {getFollowedUsers, getTweetsByUser} from '../../firebase/firebase.utils';

import './news-feed.styles.scss';

const NewsFeed = () => {
  const CurrentUser = useContext(CurrentUserContext);
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const feedTheFeed = async (id) => {
    setIsLoading(true);
    const followedUsers = await getFollowedUsers(id);

    if(followedUsers) {
      followedUsers.docs.forEach(async doc => {
        const followedId = doc.data();
        const unformatTweets = await getTweetsByUser(followedId.follows);

        if(unformatTweets.docs) {
          unformatTweets.docs.map(unformatTweet => {
            const tweetText = unformatTweet.data();

            setTweets(oldTweets => [
              ...oldTweets, 
              tweetText
            ])
          })

          setIsLoading(false);
        }
      })

    }
  }

  useEffect(() => {
    if(!CurrentUser) return;
    
    if(CurrentUser.id || CurrentUser.uid) {
      feedTheFeed(CurrentUser.id);
    }
  }, [CurrentUser]);

  return(
    <div className="news-feed container">
      {
        isLoading ? (
          <div className="loader">Loading</div>
        ) : (
          tweets.length !== 0 ? (
            tweets.map(tweet => <Tweet userId={CurrentUser.id} {...tweet} key={CurrentUser.id} />)
          ) : null
        )
      }
    </div>
  )
}

export default NewsFeed;
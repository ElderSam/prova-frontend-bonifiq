
import { Suspense, useState, useEffect, useMemo } from 'react';
import './App.css';
import './AppWidget.css';

import { UserHeader } from './components/UserHeader';
import { PostList } from './components/PostList';
import { Loading } from './components/Loading';

import { fetchUser } from './services/userService';
import { fetchPosts } from './services/postService';
import { CloseButton } from './components/CloseButton';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const [userId, setUserId] = useState<number>(2);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.loggedUserId) {
        setUserId(Number(event.data.loggedUserId));
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const postsPromise = useMemo(() => fetchPosts(userId), [userId]);

  return (
    <div className="widget-root">
      <CloseButton />
      <div className="widget-content">
        <Suspense fallback={<Loading showSpinner={false} />}>
          <UserHeader userPromise={userPromise} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <PostList postsPromise={postsPromise} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;

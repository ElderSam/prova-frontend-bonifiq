
import { Suspense, useState, useEffect } from 'react';
import './App.css';
import './AppWidget.css';
import { UserHeader } from './components/UserHeader';
import { PostList } from './components/PostList';
import { Loading } from './components/Loading';
import { fetchUser } from './services/userService';
import { fetchPosts } from './services/postService';

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

  const userPromise = fetchUser(userId);
  const postsPromise = fetchPosts(userId);

  return (
    <div className="widget-root">
  <h2 className="widget-title">Widget de Usuário</h2>
  <div className="widget-content">
        <Suspense fallback={<Loading text="Carregando usuário..." />}>
          <UserHeader userPromise={userPromise} />
        </Suspense>
        <Suspense fallback={<Loading text="Carregando posts..." />}>
          <PostList postsPromise={postsPromise} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;

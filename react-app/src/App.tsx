
import { Suspense, useState, useEffect } from 'react';
import './App.css';
import { UserHeader } from './components/UserHeader';
import { PostList } from './components/PostList';
import { Loading } from './components/Loading';
import { createResource } from './hooks/createResource';
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

// Simple cache for resources by userId
const userResourceCache: Record<number, ReturnType<typeof createResource<User>>> = {};
const postsResourceCache: Record<number, ReturnType<typeof createResource<Post[]>>> = {};

function getUserResource(userId: number): ReturnType<typeof createResource<User>> {
  if (!userResourceCache[userId]) {
    userResourceCache[userId] = createResource<User>(fetchUser(userId));
  }
  return userResourceCache[userId];
}

function getPostsResource(userId: number): ReturnType<typeof createResource<Post[]>> {
  if (!postsResourceCache[userId]) {
    postsResourceCache[userId] = createResource<Post[]>(fetchPosts(userId));
  }
  return postsResourceCache[userId];
}

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

  const userResource = getUserResource(userId);
  const postsResource = getPostsResource(userId);

  return (
    <div className="widget-root">
      <Suspense fallback={<Loading text="Carregando usuário..." />}>
        <UserHeader user={userResource.read()} />
        <Suspense fallback={<Loading text="Carregando posts..." />}>
          <PostList posts={postsResource.read()} />
        </Suspense>
      </Suspense>
    </div>
  );
}

export default App;

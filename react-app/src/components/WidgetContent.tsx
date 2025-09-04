
import { Suspense, useMemo } from 'react';
import './WidgetContent.css';

import { UserHeader } from './../components/UserHeader';
import { PostList } from './../components/PostList';
import { Loading } from './../components/Loading';

import { fetchUser } from './../services/userService';
import { fetchPosts } from './../services/postService';
import { CloseButton } from './../components/CloseButton';


export function WidgetContent({userId}: { userId: number }) {
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
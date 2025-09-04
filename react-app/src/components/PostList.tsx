import { use } from 'react';
import type { Post } from '../App';

export function PostList({ postsPromise }: { postsPromise: Promise<Post[]> }) {
  const posts = use(postsPromise);

  return (
    <div className="widget-posts">
      {posts.map(post => (
        <div key={post.id} className="widget-post">
          <div className="widget-post-title">{post.title}</div>
          <div className="widget-post-body">{post.body}</div>
        </div>
      ))}
    </div>
  );
}

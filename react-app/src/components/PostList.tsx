import type { Post } from '../App';

export function PostList({ posts }: { posts: Post[] }) {
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

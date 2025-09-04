import { describe, it, expect, vi } from 'vitest';
import * as userService from '../services/userService';
import * as postService from '../services/postService';

describe('Services', () => {
  it('fetchUser returns mocked user', async () => {
    const mockUser = { id: 1, name: 'Samuel' };
    const spy = vi.spyOn(userService, 'fetchUser').mockResolvedValue(mockUser);

    const user = await userService.fetchUser(1);
    expect(user).toEqual(mockUser);

    spy.mockRestore();
  });

  it('fetchPosts returns mocked posts', async () => {
    const userId = 1;

    const mockPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];

    const spy = vi.spyOn(postService, 'fetchPosts').mockResolvedValue(mockPosts);
    const posts = await postService.fetchPosts(userId);
    expect(posts).toEqual(mockPosts);

    spy.mockRestore();
  });
});

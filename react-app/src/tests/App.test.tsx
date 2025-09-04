import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import App from '../App';
import * as postService from '../services/postService';

// Mock do WidgetContent para forçar nome "Samuel"
vi.mock('../components/WidgetContent', () => {
  return {
    WidgetContent: ({ userId }: { userId: number }) => (
      <div>
        <div>Widget para usuário {userId}</div>
        <div className="user-name">Samuel</div>
        <div className="user-posts">
          <div>Post 1</div>
          <div>Post 2</div>
        </div>
      </div>
    )
  };
});

// Função helper para disparar eventos de mensagem dentro do act
async function dispatchMessage(data: any) {
  await act(async () => {
    window.dispatchEvent(new MessageEvent('message', { data }));
  });
}

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(postService, 'fetchPosts').mockResolvedValue([
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mostra fallback enquanto carrega', () => {
    render(<App />);
    expect(screen.getByText('Carregando widget...')).toBeInTheDocument();
  });

  it('mostra erro quando receber mensagem inválida', async () => {
    render(<App />);
    await dispatchMessage({ type: 'widget:user' });
    expect(await screen.findByText(/ID do usuário inválido/i)).toBeInTheDocument();
  });

  it('mostra WidgetContent quando receber userId válido', async () => {
    render(<App />);
    await dispatchMessage({ type: 'widget:user', loggedUserId: 123 });
    expect(await screen.findByText(/Widget para usuário 123/i)).toBeInTheDocument();
  });

  it('renders user name', async () => {
    render(<App />);
    await dispatchMessage({ type: 'widget:user', loggedUserId: 1 });
    expect(await screen.findByText('Samuel')).toBeInTheDocument();
  });

  it('renders posts', async () => {
    render(<App />);
    await dispatchMessage({ type: 'widget:user', loggedUserId: 1 });
    expect(await screen.findByText('Post 1')).toBeInTheDocument();
    expect(await screen.findByText('Post 2')).toBeInTheDocument();
  });

  it('renders error when message is invalid', async () => {
    render(<App />);
    await dispatchMessage({ type: 'widget:user', loggedUserId: null });
    expect(await screen.findByText(/ID do usuário inválido/i)).toBeInTheDocument();
  });
});

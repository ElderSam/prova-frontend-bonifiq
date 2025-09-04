import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

// Mock do WidgetContent
vi.mock('../components/WidgetContent', () => ({
  WidgetContent: ({ userId }: { userId: number }) => <div>Widget para usuário {userId}</div>
}));

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });


  it('mostra fallback enquanto carrega', () => {
    render(<App />);
    expect(screen.getByText('Carregando widget...')).toBeInTheDocument();
  });


  it('mostra erro quando receber mensagem inválida', async () => {
    render(<App />);

    const event = new MessageEvent('message', { data: { type: 'widget:user' } });
    window.dispatchEvent(event);

    // findByText já espera a atualização do DOM
    const erro = await screen.findByText(/ID do usuário inválido/i);
    expect(erro).toBeInTheDocument();
  });


  it('mostra WidgetContent quando receber userId válido', async () => {
    render(<App />);

    const event = new MessageEvent('message', { data: { type: 'widget:user', loggedUserId: 123 } });
    window.dispatchEvent(event);

    const widget = await screen.findByText(/Widget para usuário 123/i);
    expect(widget).toBeInTheDocument();
  });
});

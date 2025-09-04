export function Loading({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="widget-loading">
      <div className="widget-spinner"></div>
      <span>{text}</span>
    </div>
  );
}

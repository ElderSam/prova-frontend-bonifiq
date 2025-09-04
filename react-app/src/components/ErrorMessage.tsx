export function ErrorMessage({ error }: { error: string }) {
  return <div className="widget-error">{error}</div>;
}

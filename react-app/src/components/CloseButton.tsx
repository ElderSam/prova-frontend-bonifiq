import '../css/CloseButton.css';

export function CloseButton () {
  function handleClose() {
    window.parent.postMessage({ widgetClose: true }, '*');
  }

  return (
    <button className="widget-close" onClick={handleClose} title="Fechar">×</button>
  )
}

import { useState, useEffect } from 'react';
import './css/App.css';
import { WidgetContent } from './components/WidgetContent';

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  function onMessage(ev: MessageEvent) {
    // opcional: validar origin se quiser
    const data = ev.data as { type?: string; loggedUserId?: number };
    setUserId(2)
    // if (data && data.type === 'widget:user' && typeof data.loggedUserId === 'number') {
    //   setUserId(data.loggedUserId);
    // }
    // else {
    //   setError("ID do usuário inválido.");
    // }
  }

  useEffect(() => {
    window.addEventListener('message', onMessage);

    // Avisa o pai que o listener já está pronto:
    try {
      window.parent.postMessage({ widgetReady: true }, '*'); // Em prod, troque '*' pelo origin do pai se for fixo
    }
    catch {
      setError("Erro inesperado ao obter ID do usuário")
    }

    return () => window.removeEventListener('message', onMessage);
  }, []);


  if (userId) {
    return <WidgetContent userId={userId} />
  }

  if (error) {
    return <h3>Atenção: <br /><span className='error-message'>{error}</span></h3>
  }

  return <p>Carregando widget...</p>; // 👈 fallback
}

export default App;

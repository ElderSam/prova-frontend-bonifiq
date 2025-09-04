
import { useState, useEffect } from 'react';
import './App.css';
import { WidgetContent } from './components/WidgetContent';

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {

      if (event.data && event.data.loggedUserId) {
        setUserId(Number(event.data.loggedUserId));
      }
      else {
        setError(true);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if(error) {
    return <h1>Atenção: <br/><span className='error-message'>ID do usuário inválido.</span></h1>
  }

  if(userId) {
    return <WidgetContent userId={userId} />
  }
}

export default App;

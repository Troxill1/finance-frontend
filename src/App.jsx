import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('API error: ', err)); 
  }, []);

  return (
    <div classname="p-4 text-xl font-bold">
      Laravel says: {message || 'Loading...'}
    </div>
  );
}

export default App

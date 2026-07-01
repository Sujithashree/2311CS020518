import { useEffect } from 'react';
import { Log } from './utils/logger';

function App() {
  useEffect(() => {
    Log('frontend', 'info', 'component', 'App loaded successfully');
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>AffordMed Frontend Evaluation</h1>
      <p>The logger has been wired into the app.</p>
    </div>
  );
}

export default App;

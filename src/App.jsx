import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NotificationsPage from './pages/Notifications';
import PriorityPage from './pages/Priority';
import { Log } from './utils/logger';

function App() {
  const [activePage, setActivePage] = useState('notifications');

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Home Loaded');
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      {activePage === 'notifications' ? <NotificationsPage /> : <PriorityPage />}
    </div>
  );
}

export default App;

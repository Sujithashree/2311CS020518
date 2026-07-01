import { useEffect, useState } from 'react';
import { fetchPriorityNotifications } from '../api/notificationApi';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../utils/logger';

function PriorityPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPriorityNotifications() {
      try {
        setLoading(true);
        const data = await fetchPriorityNotifications();
        setNotifications(data);
        Log('frontend', 'warn', 'api', 'API Slow');
      } catch (err) {
        Log('frontend', 'error', 'component', 'Priority Notifications Failed');
      } finally {
        setLoading(false);
      }
    }

    loadPriorityNotifications();
  }, []);

  return (
    <section>
      <h3 style={{ marginTop: 0 }}>Priority alerts</h3>
      {loading && <p>Loading priority notifications...</p>}
      {!loading && notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} onMarkRead={() => {}} />
      ))}
    </section>
  );
}

export default PriorityPage;

import { useEffect, useMemo, useState } from 'react';
import { fetchNotifications, markNotificationAsRead } from '../api/notificationApi';
import Filter from '../components/Filter';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../utils/logger';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        setNotifications(data);
        Log('frontend', 'info', 'component', 'Loaded Notifications');
      } catch (err) {
        setError('Unable to load notifications.');
        Log('frontend', 'error', 'component', 'Notification Fetch Failed');
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((item) => item.unread);
    }

    if (filter === 'priority') {
      return notifications.filter((item) => item.priority === 'high');
    }

    return notifications;
  }, [filter, notifications]);

  async function handleMarkRead(id) {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
      Log('frontend', 'info', 'state', 'Notification Marked Read');
    } catch (err) {
      Log('frontend', 'error', 'component', 'Notification Mark Failed');
    }
  }

  return (
    <section>
      <h3 style={{ marginTop: 0 }}>Recent notifications</h3>
      <Filter activeFilter={filter} onChange={(value) => {
        setFilter(value);
        Log('frontend', 'info', 'component', 'Notifications Filtered');
      }} />

      {loading && <p>Loading notifications...</p>}
      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}

      {!loading && !error && filteredNotifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} onMarkRead={handleMarkRead} />
      ))}
    </section>
  );
}

export default NotificationsPage;

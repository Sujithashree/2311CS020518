import { useEffect, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { fetchNotifications, markNotificationAsRead } from '../api/notificationApi';
import Filter from '../components/Filter';
import NotificationCard from '../components/NotificationCard';
import { Log } from '../utils/logger';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);
        const data = await fetchNotifications(filter === 'all' ? '' : filter);
        setNotifications(data);
        setPage(1);
        Log('frontend', 'info', 'component', 'Loaded Notifications');
      } catch (err) {
        setError('Unable to load notifications.');
        Log('frontend', 'error', 'component', 'Notification Fetch Failed');
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [filter]);

  const filteredNotifications = useMemo(() => {
    const items = notifications.filter((item) => {
      if (filter === 'all') return true;
      return item.notification_type === filter;
    });

    return items;
  }, [filter, notifications]);

  const start = (page - 1) * limit;
  const current = filteredNotifications.slice(start, start + limit);
  const totalPages = Math.max(1, Math.ceil(filteredNotifications.length / limit));

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
      <Typography variant="h5" sx={{ mb: 1 }}>
        Recent notifications
      </Typography>
      <Filter
        activeFilter={filter}
        onChange={(value) => {
          setFilter(value);
          Log('frontend', 'info', 'component', 'Notifications Filtered');
        }}
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && current.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} onMarkRead={handleMarkRead} />
      ))}

      {!loading && !error && filteredNotifications.length > limit && (
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
            Previous
          </Button>
          <Typography sx={{ alignSelf: 'center' }}>
            Page {page} of {totalPages}
          </Typography>
          <Button disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)}>
            Next
          </Button>
        </Stack>
      )}
    </section>
  );
}

export default NotificationsPage;

const TOKEN = 'xpQddd';
const BASE_URL = 'http://4.224.186.213/evaluation-service';

function normalizeNotification(item) {
  return {
    id: item.id ?? item._id,
    title: item.title ?? item.message ?? 'Notification',
    message: item.message ?? item.title ?? 'No details available',
    priority: item.priority ?? 'medium',
    unread: item.unread ?? item.read === false,
    category: item.notification_type ?? item.category ?? 'general',
    createdAt: item.createdAt ?? item.created_at,
    notification_type: item.notification_type ?? item.category ?? 'general',
  };
}

function sortNotifications(items) {
  const order = { placement: 1, result: 2, event: 3 };
  return [...items]
    .map(normalizeNotification)
    .sort((a, b) => {
      const aOrder = order[a.notification_type] ?? 99;
      const bOrder = order[b.notification_type] ?? 99;
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
}

export async function fetchNotifications(type = '') {
  const query = type ? `?notification_type=${encodeURIComponent(type)}` : '';
  const res = await fetch(`${BASE_URL}/notifications${query}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }

  const data = await res.json();
  return sortNotifications(Array.isArray(data) ? data : data.notifications || []);
}

export async function fetchPriorityNotifications() {
  const notifications = await fetchNotifications();
  return notifications.filter((item) => item.unread).sort((a, b) => {
    const priorityRank = { high: 0, medium: 1, low: 2 };
    return (priorityRank[a.priority] ?? 99) - (priorityRank[b.priority] ?? 99);
  }).slice(0, 10);
}

export async function markNotificationAsRead(id) {
  const res = await fetch(`${BASE_URL}/notifications/${id}/read`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to mark notification as read');
  }

  const data = await res.json();
  return normalizeNotification(data);
}

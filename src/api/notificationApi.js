const sampleNotifications = [
  {
    id: 1,
    title: 'Medication refill ready',
    message: 'Your monthly prescription is ready for pickup.',
    priority: 'high',
    unread: true,
    category: 'reminder',
  },
  {
    id: 2,
    title: 'Lab results available',
    message: 'Your latest blood work is now available in your portal.',
    priority: 'medium',
    unread: false,
    category: 'results',
  },
  {
    id: 3,
    title: 'Appointment reminder',
    message: 'You have an appointment tomorrow at 10:30 AM.',
    priority: 'high',
    unread: true,
    category: 'appointment',
  },
  {
    id: 4,
    title: 'Insurance update',
    message: 'Your insurance details were updated successfully.',
    priority: 'low',
    unread: false,
    category: 'billing',
  },
];

export function fetchNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleNotifications), 400);
  });
}

export function fetchPriorityNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleNotifications.filter((item) => item.priority === 'high')), 400);
  });
}

export function markNotificationAsRead(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated = sampleNotifications.find((item) => item.id === id);
      if (updated) {
        updated.unread = false;
      }
      resolve(updated);
    }, 250);
  });
}

function NotificationCard({ notification, onMarkRead }) {
  return (
    <article
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '0.9rem',
        background: notification.unread ? '#f8fafc' : '#fff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: '0 0 0.3rem' }}>{notification.title}</h3>
          <p style={{ margin: 0, color: '#4b5563' }}>{notification.message}</p>
        </div>
        <span
          style={{
            padding: '0.3rem 0.6rem',
            borderRadius: '999px',
            background: notification.priority === 'high' ? '#fee2e2' : '#e0f2fe',
            color: notification.priority === 'high' ? '#991b1b' : '#075985',
            fontSize: '0.8rem',
          }}
        >
          {notification.priority}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
        <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{notification.category}</span>
        {notification.unread && (
          <button
            onClick={() => onMarkRead(notification.id)}
            style={{ border: 'none', background: '#2563eb', color: '#fff', padding: '0.5rem 0.8rem', borderRadius: '8px', cursor: 'pointer' }}
          >
            Mark read
          </button>
        )}
      </div>
    </article>
  );
}

export default NotificationCard;

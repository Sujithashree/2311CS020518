function Filter({ activeFilter, onChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'priority', label: 'Priority' },
  ];

  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onChange(filter.key)}
          style={{
            padding: '0.5rem 0.9rem',
            borderRadius: '999px',
            border: activeFilter === filter.key ? '1px solid #2563eb' : '1px solid #d1d5db',
            background: activeFilter === filter.key ? '#dbeafe' : '#fff',
            color: '#111827',
            cursor: 'pointer',
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;

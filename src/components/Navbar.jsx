function Navbar({ activePage, onNavigate }) {
  const links = [
    { key: 'notifications', label: 'Notifications' },
    { key: 'priority', label: 'Priority' },
  ];

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h2 style={{ margin: 0 }}>AffordMed Notifications</h2>
      <div style={{ display: 'flex', gap: '0.8rem' }}>
        {links.map((link) => (
          <button
            key={link.key}
            onClick={() => onNavigate(link.key)}
            style={{
              border: 'none',
              padding: '0.6rem 1rem',
              borderRadius: '999px',
              background: activePage === link.key ? '#111827' : '#e5e7eb',
              color: activePage === link.key ? '#fff' : '#111827',
              cursor: 'pointer',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;

import { Chip, Stack } from '@mui/material';

function Filter({ activeFilter, onChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'placement', label: 'Placement' },
    { key: 'result', label: 'Result' },
    { key: 'event', label: 'Event' },
  ];

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
      {filters.map((filter) => (
        <Chip
          key={filter.key}
          label={filter.label}
          clickable
          color={activeFilter === filter.key ? 'primary' : 'default'}
          variant={activeFilter === filter.key ? 'filled' : 'outlined'}
          onClick={() => onChange(filter.key)}
        />
      ))}
    </Stack>
  );
}

export default Filter;

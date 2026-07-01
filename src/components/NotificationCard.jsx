import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

function NotificationCard({ notification, onMarkRead }) {
  return (
    <Card sx={{ mb: 2, borderLeft: notification.unread ? 4 : 0, borderColor: 'primary.main' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <div>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {notification.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {notification.message}
            </Typography>
          </div>
          <Chip label={notification.priority} color={notification.priority === 'high' ? 'error' : 'info'} size="small" />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {notification.category}
          </Typography>
          {notification.unread && (
            <Button variant="contained" size="small" onClick={() => onMarkRead(notification.id)}>
              Mark Read
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;

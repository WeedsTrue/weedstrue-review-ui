import { showNotification } from '@mantine/notifications';
import { AlertCircle } from 'tabler-icons-react';
const triggerNotification = (message, title, color) => {
  const clr = color ?? 'red';
  showNotification({
    title: title ?? 'Error',
    message: message ?? 'Oops something went wrong.',
    color: clr,
    icon: <AlertCircle />,
    styles: theme => ({
      root: {
        backgroundColor: theme.colors[clr][6],
        borderColor: theme.colors[clr][6]
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors[clr][7] }
      }
    })
  });
};

export { triggerNotification };

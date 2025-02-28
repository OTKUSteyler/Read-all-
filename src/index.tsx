import { React, useState } from 'react';
import { Button } from '@vendetta/ui/components';
import { flux } from '@vendetta/api';

const MarkAllReadButton = () => {
  const [allRead, setAllRead] = useState(false);

  const handleMarkAllRead = () => {
    if (flux.actions.markRead) {
      flux.actions.markRead(); // Marks all messages as read
      setAllRead(true);
    }
  };

  return (
    <Button onClick={handleMarkAllRead} size={Button.Sizes.SMALL} disabled={allRead}>
      {allRead ? "All Read" : "Mark All as Read"}
    </Button>
  );
};

export default MarkAllReadButton;

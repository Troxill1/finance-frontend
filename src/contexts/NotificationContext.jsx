import { createContext, useContext, useState } from "react";
import Notification from "../Notification.jsx";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const notify = (message, type) => {
        const id = Date.now();

        setNotifications((prev) => {
            const next = [...prev, { id, message, type }];
            if (next.length > 3) next.shift();  // remomves the oldest notification (max 3)
            return next;
        });
    };

  const remove = (id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
        {children}

        <div id="notification-stack">
            {notifications.map((n) => (
                <Notification
                    key={n.id}
                    message={n.message}
                    type={n.type}
                    onDismiss={() => remove(n.id)}
                />
            ))}
        </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

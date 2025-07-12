import { useEffect, useRef, useState } from 'react';
import './styles/Notification.css';

const Notification = ({ message, type = "info", onDismiss }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    if (!message) return null;

    if (!(["info", "success", "warning", "issue"].includes(type))) {
        type = "info";
    }

    useEffect(() => {
        const card = cardRef.current;
        if (card) {
             void card.offsetWidth;
            card.classList.add("notification-expand");
        }
        
        const timer = setTimeout(() => {
            handleDismiss();
        }, 4000);

        return () => clearTimeout(timer);
    }, []);
    
    const handleDismiss = () => {
        const card = cardRef.current;
        if (card) {
            card.classList.remove("notification-expand");
            card.classList.add("notification-collapse");
        }

        setTimeout(() => {
            setIsVisible(false);
            onDismiss?.();
        }, 1000);
    }

    if (!isVisible) return null

    return (
        <div className={`notification ${type}-notification`} ref={cardRef}>
            <p className="notification">{message}!</p>
            <button className="notification" onClick={handleDismiss}>X</button>
        </div>
    );
}

export default Notification
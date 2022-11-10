import { useEffect, useState, createContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast from 'components/ui/Toast';

export const ToastContext = createContext(null);

export const ToastProvider = ({ children, maxSnack = 4 }) => {
  const [toasts, setToasts] = useState([]);

  const hideToast = (id) => {
    setToasts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          clearTimeout(item.hideTimer);

          return {
            ...item,
            removeTimer: setTimeout(() => {
              removeToast(id);
            }, 300),
          };
        }

        return item;
      });
    });
  };

  const addToast = (toast) => {
    const newId = +new Date();

    if (toasts.length >= maxSnack) {
      hideToast(toasts[0].id);
      setToasts((prev) => {
        return [
          ...prev,
          {
            ...toast,
            id: newId,
            hideTimer: setTimeout(() => {
              hideToast(newId);
            }, 5000),
          },
        ];
      });
    } else {
      setToasts((prev) => {
        return [
          ...prev,
          {
            ...toast,
            id: newId,
            hideTimer: setTimeout(() => {
              hideToast(newId);
            }, 5000),
          },
        ];
      });
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => {
      return prev.filter((item) => {
        if (item.id !== id) {
          return true;
        }

        clearTimeout(item.removeTimer);
        return false;
      });
    });
  };

  const clearAllTimers = useCallback(() => {
    toasts.forEach(({ hideTimer, removeTimer }) => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    });
  }, [toasts]);

  const removeAllToast = () => {
    clearAllTimers();
    setToasts([]);
  };

  useEffect(() => {
    return () => {
      // debugger;
    };
  }, []);

  const contextValue = { addToast, removeToast, hideToast, removeAllToast };

  return (
    <ToastContext.Provider value={contextValue}>
      {children} {createPortal(<Toast toasts={toasts} />, document.body)}
    </ToastContext.Provider>
  );
};

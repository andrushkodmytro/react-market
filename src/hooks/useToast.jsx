import { useContext } from 'react';
import { ToastContext } from 'contexts/toastContext';

function useToast() {
  const { error, addToast, removeToast, hideToast } = useContext(ToastContext);
  return { error, addToast, removeToast, hideToast };
}

export default useToast;

import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const useNotify = (status, message) => {
  switch (status) {
    case 'success':
      toast.success(message, { ...toastConfig, icon: () => <img src="/emoti-happy.png" alt="happy" width="30" /> });
      break;
    case 'warning':
      toast.warning(message, { ...toastConfig, icon: () => <img src="/alert-icon.png" alt="sad" width="30" /> });
      break;
    case 'info':
      toast.info(message, { ...toastConfig, icon: () => <img src="/emoti-celebrate.png" alt="sad" width="30" /> });
      break;
    case 'error':
      toast.error(message, { ...toastConfig, icon: () => <img src="/emoti-sad.png" alt="sad" width="30" /> });
      break;
    default:
      toast.success('Default Mensaje', toastConfig);
      break;
  }
};

export default useNotify;

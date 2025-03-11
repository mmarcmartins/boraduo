import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";

const baseToastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    backgroundColor: "#383A3D",
    color: "#FFFFFF"
  },
  progressClassName: "white-progress"
};


export const showSuccessToast = (message: string, toastId: string = "success-toast") => {
  return toast.success(message, {
    ...baseToastConfig,
    toastId,
    icon: () => <PiLinkSimpleHorizontalBold color="#FFFFFF" />
  });
};

export const showErrorToast = (message: string, toastId: string = "error-toast") => {
  return toast.error(message, {
    ...baseToastConfig,
    toastId
  });
};
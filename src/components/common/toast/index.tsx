import React, { useCallback, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './toast.module.scss';
import Error from '@public/assets/icons/error.svg?url';
import Close from '@public/assets/icons/close-outline.svg?url';

interface ICustomToast {
  message: string;
  icon?: React.ReactNode;
}
export const CustomToast: React.FC<ICustomToast> = ({
  message,
  icon = Error
}) => {
  const notify = useCallback(
    () =>
      toast(
        <div className={style.toastContainer}>
          <p className={style.toastMessage}>{message}</p>
          <Close />
        </div>,
        {
          className: style.toast,
          bodyClassName: style.toastCloseButton,
          closeButton: false,
          hideProgressBar: true,
          icon: icon
        }
      ),
    [icon, message]
  );

  useEffect(() => {
    notify();
  }, [message, notify]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

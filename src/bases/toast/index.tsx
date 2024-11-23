export type { ToastShowProps } from '@/bases/toast/methods';

import { show } from '@/bases/toast/methods';

export interface ToastProps {
  show: typeof show;
}

const Toast = {
  show,
};

export default Toast;

import InternalDialog from '@/bases/dialog/dialog';
import confirm from '@/bases/dialog/confirm';

export type { DialogProps } from '@/bases/dialog/dialog';

type InternalDialogType = typeof InternalDialog;

export interface DialogInterface extends InternalDialogType {
  confirm: typeof confirm;
}

const Dialog = InternalDialog as DialogInterface;

Dialog.confirm = confirm;

export default Dialog;

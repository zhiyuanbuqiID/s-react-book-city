import React from 'react';
import cx from 'classnames';

import { Popup, Grid, Input, InputRef, Toast, Dialog } from '@/bases';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { useAppDispatch, useAppSelector } from '@/store';
import { IBookInfo } from '@/types/book';
import { setGroup, deleteShelf, deleteShelfGroup } from '@/utils/shelf';
import { shelfActions } from '@/pages/shelf/store';

import styles from './index.module.scss';

const EditBar: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const groupList = useReadLocalStorage<Record<string, IBookInfo[]>>('shelf-group') || {};

  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);
  const selectedBook = useAppSelector<IBookInfo[]>((state) => state.shelf.selectedBook);
  const selectedGroup = useAppSelector<string[]>((state) => state.shelf.selectedGroup);

  const [groupVisible, setGroupVisible] = React.useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  const inputRef = React.useRef<InputRef>(null);

  const isDisabled = !selectedBook.length && !selectedGroup.length;

  const onShowGroup = () => {
    if (isDisabled) return;
    setGroupVisible(true);
  };

  const onCreateGroup = () => {
    setDialogVisible(true);
    setGroupVisible(false);
  };

  const onCancelDialog = () => {
    setInputValue('');
    setDialogVisible(false);
    inputRef.current?.clear();
  };

  const onConfirmDialog = () => {
    setInputValue('');
    setDialogVisible(false);
    inputRef.current?.clear();
    const msg = setGroup(inputValue, selectedBook, selectedGroup);
    Toast.show(msg);
    dispatch(shelfActions.clearSelectedBook([]));
    dispatch(shelfActions.clearSelectedGroup([]));
  };

  const onGroup = (name: string) => {
    const msg = setGroup(name, selectedBook, selectedGroup);
    Toast.show(msg);
    setGroupVisible(false);
    dispatch(shelfActions.clearSelectedBook([]));
    dispatch(shelfActions.clearSelectedGroup([]));
  };

  const onDelete = () => {
    if (isDisabled) return;
    Dialog.confirm({
      content: '是否确认删除',
      onConfirm: () => {
        deleteShelf(selectedBook);
        deleteShelfGroup(selectedGroup);
        dispatch(shelfActions.clearSelectedBook([]));
        dispatch(shelfActions.clearSelectedGroup([]));
        dispatch(shelfActions.setEditMode(false));
        Toast.show('删除成功');
      },
    });
  };

  return (
    <div className={styles.editBar}>
      <Popup visible={editMode} position="bottom" mask={false}>
        <Grid columns={2}>
          <Grid.Item onClick={onShowGroup}>
            <div className={cx(styles.item, { [styles.disabled]: isDisabled })}>分组至</div>
          </Grid.Item>
          <Grid.Item onClick={onDelete}>
            <div className={cx(styles.item, { [styles.disabled]: isDisabled })}>
              删除({selectedBook.length + selectedGroup.length})
            </div>
          </Grid.Item>
        </Grid>
      </Popup>

      <Popup
        className={styles.group}
        visible={groupVisible}
        position="bottom"
        onMaskClick={() => setGroupVisible(false)}
      >
        <div className={styles.groupTitle}>书籍分组</div>
        <div className={styles.groupAdd} onClick={onCreateGroup}>
          <i className="icon-add" />
          <div>新建分组</div>
        </div>
        <div className={styles.groupList}>
          {Object.keys(groupList).map((name) => (
            <div className={styles.groupItem} key={name}>
              <i className="icon-folder" />
              <div className={styles.groupName} onClick={() => onGroup(name)}>
                {name}
              </div>
            </div>
          ))}
        </div>
      </Popup>
      <Dialog
        visible={dialogVisible}
        content={
          <>
            <h2>新建分组</h2>
            <div className={styles.input}>
              <Input value={inputValue} onChange={setInputValue} ref={inputRef} />
            </div>
          </>
        }
        actions={[
          {
            key: 'cancel',
            text: '取消',
            onClick: onCancelDialog,
          },
          {
            key: 'confirm',
            text: '提交',
            color: 'primary',
            onClick: onConfirmDialog,
          },
        ]}
      />
    </div>
  );
});

export default EditBar;

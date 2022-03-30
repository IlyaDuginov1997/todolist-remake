import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import s from './addItemForm.module.css';

import { ReturnComponentType } from 'types';
import { trimFunction } from 'utils';

type AddItemFormPropsType = {
  setTitle: (title: string) => void;
};

const ENTER_CHARCODE = 13;

export const AddItemForm: React.FC<AddItemFormPropsType> = ({
  setTitle,
}): ReturnComponentType => {
  const [error, setError] = useState<string>('');
  const [localTitle, setLocalTitle] = useState('');

  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocalTitle(e.currentTarget.value);
    setError('');
  };

  const addTitle = (): void => {
    const newStr = trimFunction(localTitle);
    if (newStr) {
      setTitle(newStr);
      setLocalTitle('');
    } else {
      setError('Enter correct data');
    }
  };

  const onKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.charCode === ENTER_CHARCODE) {
      addTitle();
    }
  };

  return (
    <div>
      <input
        className={error && 'error'}
        type="text"
        value={localTitle}
        onChange={changeTitle}
        onKeyPress={onKeyPressHandle}
      />

      <button type="button" onClick={addTitle}>
        Add
      </button>

      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};

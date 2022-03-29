import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { ReturnComponentType } from 'types';
import { trimFunction } from 'utils';

type AddItemFormPropsType = {
  setTitle: (title: string) => void;
};

const ENTER_CHARCODE = 13;

export const AddItemForm: React.FC<AddItemFormPropsType> = ({
  setTitle,
}): ReturnComponentType => {
  const [localTitle, setLocalTitle] = useState('');

  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocalTitle(e.currentTarget.value);
  };

  const addTitle = (): void => {
    const newStr = trimFunction(localTitle);
    setTitle(newStr);
    setLocalTitle(newStr);
  };

  const onKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.charCode === ENTER_CHARCODE) {
      addTitle();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={localTitle}
        onChange={changeTitle}
        onKeyPress={onKeyPressHandle}
      />

      <button type="button" onClick={addTitle}>
        Add
      </button>
    </div>
  );
};

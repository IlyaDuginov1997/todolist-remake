import React, { ChangeEvent, useState } from 'react';

import { ReturnComponentType } from 'types';
import { trimFunction } from 'utils';

type EditableSpanPropsType = {
  title: string;
  changeTitle: (title: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
  title,
  changeTitle,
}): ReturnComponentType => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [localTitle, setLocalTitle] = useState<string>(title);

  const changeTaskEditableSpan = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocalTitle(e.currentTarget.value);
  };

  const setOnMode = (): void => {
    setEditMode(true);
  };

  const setOffMode = (): void => {
    setLocalTitle(trimFunction(localTitle));
    changeTitle(localTitle);
    setEditMode(false);
  };

  return (
    <span>
      {editMode ? (
        <input
          type="text"
          value={localTitle}
          onChange={changeTaskEditableSpan}
          onBlur={setOffMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={setOnMode}>{localTitle}</span>
      )}
    </span>
  );
};

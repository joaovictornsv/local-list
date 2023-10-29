import { useEffect, useRef, useState } from 'react';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { Button } from '../atoms/Button.jsx';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons/faThumbtack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlash } from '@fortawesome/free-solid-svg-icons/faSlash';
import { handleClickOutside } from '../../utils/handleClickOutside.js';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import classNames from 'classnames';

export const Actions = ({ onEdit, onDelete, onPin, alreadyPinned }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [askingConfirmation, setAskingConfirmation] = useState(false);
  const wrapperRef = useRef(null);

  const onClickOutside = () => {
    setShowOptions(false);
    setAskingConfirmation(false);
  };

  const onClickToShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const onClickToPin = () => {
    onPin();
    setShowOptions(false);
  };

  const onClickToDelete = () => {
    onDelete();
    setShowOptions(false);
  };

  useEffect(() => {
    handleClickOutside({ wrapperRef, onClickOutside });
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative">
      <Button
        type="ghost"
        icon={faEllipsisVertical}
        onClick={onClickToShowOptions}
      />

      <div
        className={classNames(
          'absolute right-0 z-50 mt-1 flex items-center gap-1 rounded bg-zinc-800 p-1',
          {
            hidden: !showOptions,
          },
        )}
      >
        <div className="relative">
          <Button type="ghost" icon={faThumbtack} onClick={onClickToPin} />
          {alreadyPinned && (
            <FontAwesomeIcon
              icon={faSlash}
              className="pointer-events-none absolute right-1/2 top-1.5 h-3 translate-x-1/2 -rotate-90 transform text-zinc-400"
              onClick={onClickToPin}
            />
          )}
        </div>
        <Button type="ghost" icon={faPencil} onClick={onEdit} />
        {askingConfirmation ? (
          <Button
            type="danger"
            text="Confirm"
            size="sm"
            icon={faExclamationCircle}
            onClick={onClickToDelete}
          />
        ) : (
          <Button
            type="ghost"
            icon={faTrash}
            className={classNames({ hidden: askingConfirmation })}
            onClick={() => setAskingConfirmation(true)}
          />
        )}
      </div>
    </div>
  );
};

import {useEffect, useRef, useState} from "react";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import {Button} from "../atoms/Button.jsx";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {faThumbtack} from "@fortawesome/free-solid-svg-icons/faThumbtack";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlash} from "@fortawesome/free-solid-svg-icons/faSlash";
import {handleClickOutside} from "../../utils/handleClickOutside.js";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";

export const Actions = ({
  onEdit,
  onDelete,
  onPin,
  alreadyPinned
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const [askingConfirmation, setAskingConfirmation] = useState(false)
  const wrapperRef = useRef(null);

  const onClickOutside = () => {
    setShowOptions(false);
    setAskingConfirmation(false)
  }

  const onClickToShowOptions = () => {
    setShowOptions(!showOptions)
  }

  const onClickToPin = () => {
    onPin()
    setShowOptions(false)
  }

  const onClickToDelete = () => {
    onDelete();
    setShowOptions(false)
  }

  useEffect(() => {
    handleClickOutside({wrapperRef, onClickOutside})
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative">
      <Button
        type="ghost"
        icon={faEllipsisVertical}
        onClick={onClickToShowOptions}
      />

      <div className={`${showOptions ? '': 'hidden'} flex items-center gap-1 z-50 mt-1 absolute bg-zinc-800 right-0 rounded p-1`}>
        <div className="relative">
          <Button
            type="ghost"
            icon={faThumbtack}
            onClick={onClickToPin}
          />
          {alreadyPinned && <FontAwesomeIcon className="absolute pointer-events-none -rotate-90 h-3 top-2 right-1/2 transform translate-x-1/2" icon={faSlash} onClick={onClickToPin}/> }
        </div>
        <Button
          type="ghost"
          icon={faPencil}
          onClick={onEdit}
        />
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
            className={askingConfirmation ? 'hidden': ''}
            onClick={() => setAskingConfirmation(true)}
          />
        )}
      </div>
    </div>
  )
}

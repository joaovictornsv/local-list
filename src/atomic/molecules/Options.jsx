import {useEffect, useRef, useState} from "react";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import {Button} from "../atoms/Button.jsx";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {faThumbtack} from "@fortawesome/free-solid-svg-icons/faThumbtack";
import {faWarning} from "@fortawesome/free-solid-svg-icons/faWarning";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlash} from "@fortawesome/free-solid-svg-icons/faSlash";

export const Options = ({
  onEdit,
  onDelete,
  onPin,
  alreadyPinned
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const [askingConfirmation, setAskingConfirmation] = useState(false)
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
        setAskingConfirmation(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative">
      <Button icon={faEllipsisVertical} type="ghost" onClick={() => setShowOptions(!showOptions)}/>
      <div className={`${showOptions ? '': 'hidden'} flex items-center gap-1 z-50 mt-1 absolute bg-zinc-800 right-0 rounded p-1`}>
        <div className="relative">
          <Button icon={faThumbtack} type="ghost" onClick={() => { onPin();setShowOptions(false); }}/>
          {alreadyPinned && <FontAwesomeIcon className="absolute pointer-events-none -rotate-90 h-3 top-2 right-1/2 transform translate-x-1/2" icon={faSlash} onClick={() => { onPin();setShowOptions(false); }}/> }
        </div>
        <Button icon={faPencil} type="ghost" onClick={onEdit}/>
        <Button className={askingConfirmation ? '': 'hidden'} size="sm" icon={faWarning} text="Confirm" type="danger" onClick={() => { onDelete();setShowOptions(false)}}/>
        <Button className={askingConfirmation ? 'hidden': ''} icon={faTrash} type="ghost" onClick={() => setAskingConfirmation(true)}/>
      </div>
    </div>

  )
}

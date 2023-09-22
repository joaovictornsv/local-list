import {Button} from "../atoms/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {faWarning} from "@fortawesome/free-solid-svg-icons/faWarning";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

export const RemoveConfirmation = ({
  removeAction,
}) => {
  const [askingConfirmation, setAskingConfirmation] = useState(false)

  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setAskingConfirmation(false);
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
    <>
      <Button
        type="danger"
        text="Confirm"
        icon={faWarning}
        size="sm"
        ref={wrapperRef}
        className={askingConfirmation ? '': 'hidden'}
        onClick={removeAction}
      />
      <Button
        type="ghost"
        icon={faTrash}
        className={askingConfirmation ? 'hidden': ''}
        onClick={() => setAskingConfirmation(true)}
      />
    </>
    )
}

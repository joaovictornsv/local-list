import {Button} from "../atoms/Button.jsx";
import {useEffect, useRef} from "react";
import {faWarning} from "@fortawesome/free-solid-svg-icons/faWarning";

export const RemoveConfirmation = ({
  removeAction,
  cancelAction,
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        cancelAction();
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
    <div ref={wrapperRef} className="absolute -bottom-1 translate-y-full flex flex-col items-end right-0 z-10 rounded">
      <Button icon={faWarning} text="Confirm" type="danger" onClick={removeAction}/>
    </div>
  )
}

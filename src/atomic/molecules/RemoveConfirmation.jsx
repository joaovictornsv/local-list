import {Button} from "../atoms/Button.jsx";
import {useEffect, useRef} from "react";

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
    <div ref={wrapperRef} className="absolute top-0 flex flex-col items-end right-0 drop-shadow-md z-10 bg-zinc-800 w-24 rounded">
      <Button size="lg" text="Delete" className="rounded-none text-rose-400" type="ghost" onClick={removeAction}/>
      <Button size="lg" text="Cancel" className="rounded-none" type="ghost" onClick={cancelAction}/>
    </div>
  )
}

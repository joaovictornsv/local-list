export const handleClickOutside = ({ wrapperRef, onClickOutside }) => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClickOutside();
    }
  }

  // Bind the event listener
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    // Unbind the event listener on clean up
    document.removeEventListener('mousedown', handleClickOutside);
  };
};

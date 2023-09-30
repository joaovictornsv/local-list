export const sortByDone = ({ desc }) => (itemA, itemB) => {
  const result = (itemA.done === itemB.done) ? 0 : itemA.done ? -1 : 1
  return desc ? -result : result;
}

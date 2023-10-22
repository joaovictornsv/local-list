export const sortByPin = (itemA, itemB) => {
  return itemA.pinned === itemB.pinned ? 0 : itemA.pinned ? -1 : 1;
};

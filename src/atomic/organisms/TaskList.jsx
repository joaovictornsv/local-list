import { ListItem } from '../molecules/ListItem.jsx';
import { sortByPin } from '../../utils/sortByPin.js';
import { Select } from '../atoms/Select.jsx';
import {
  SortOptions,
  useSettingsStorage,
} from '../../hooks/useSettingsStorage.js';
import { sortByDone } from '../../utils/sortByDone.js';

export const TaskList = ({ tasks }) => {
  const { changeSortType, settings } = useSettingsStorage();

  const sortTasks = () => {
    const tasksCopy = tasks.slice();
    const { sortType = SortOptions.NONE.value } = settings;
    const { noSort, isDesc } = SortOptions[sortType];

    if (!noSort) {
      tasksCopy.sort(sortByDone({ desc: isDesc }));
    }

    return tasksCopy;
  };

  const onChangeSortType = (e) => {
    changeSortType(e.target.value);
  };

  if (!tasks) {
    return <span className="text-sm">Loading tasks...</span>;
  }

  if (!tasks.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-zinc-400">
          Done: {tasks.filter((t) => t.done).length}/{tasks.length}
        </span>

        <Select
          label="Sort by"
          labelClassName="w-max flex-row items-center"
          onChange={onChangeSortType}
          value={settings.sortType}
        >
          {Object.values(SortOptions).map((sortOption) => (
            <option key={sortOption.value} value={sortOption.value}>
              {sortOption.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        {sortTasks()
          .sort(sortByPin)
          .map((task) => (
            <ListItem key={task.id} item={task} />
          ))}
      </div>
    </div>
  );
};

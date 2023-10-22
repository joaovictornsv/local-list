import { Checkbox } from '../atoms/Checkbox.jsx';
import { Button } from '../atoms/Button.jsx';
import { useTask } from '../../contexts/useTask.js';
import { Input } from '../atoms/Input.jsx';
import { useRef, useState } from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { Actions } from './Actions.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons/faThumbtack';
import { RoutePaths } from '../../router/RoutePaths.js';
import { useSection } from '../../contexts/useSection.js';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare';
import { useNavigate } from 'react-router-dom';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { Select } from '../atoms/Select.jsx';

const FormWrapper = ({ children, editMode, ...rest }) =>
  editMode ? (
    <form {...rest}>{children}</form>
  ) : (
    <div {...rest}>{children}</div>
  );

const NO_SECTION_SELECT_VALUE = 'no-section';

export const ListItem = ({ item, isSection }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(item.title);
  const [selectedSection, setSelectedSection] = useState(
    item.sectionId || NO_SECTION_SELECT_VALUE,
  );
  const [showInputError, setShowInputError] = useState(false);

  const inputRef = useRef(null);

  const { toggleTaskDone, removeTask, editTask, getTasksBySectionId } =
    useTask();
  const { sections, editSection, removeSection } = useSection();

  const tasks = isSection ? getTasksBySectionId(item.id) : [];
  const editItem = isSection ? editSection : editTask;
  const removeItem = isSection ? removeSection : removeTask;

  const validateInput = () => {
    if (!inputValue.trim()) {
      setShowInputError(true);
      inputRef.current.focus();
      return false;
    }
    return true;
  };

  const startEditMode = () => {
    setEditMode(true);
  };

  const saveChanges = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateInput()) {
      return;
    }

    editItem(item.id, {
      ...item,
      ...(!isSection && {
        sectionId:
          selectedSection === NO_SECTION_SELECT_VALUE ? null : selectedSection,
      }),
      title: inputValue,
    });
    setEditMode(false);
  };

  const onChange = (e) => {
    setShowInputError(false);
    setInputValue(e.target.value);
  };

  const onPinItem = () => {
    editItem(item.id, { ...item, pinned: !item.pinned });
  };

  const navigateToSectionPage = () => {
    navigate(`${RoutePaths.SECTION.replace(':sectionId', item.id)}`);
  };

  const onKeyDownInput = (e) => {
    if (e.key !== 'Escape') {
      return;
    }

    e.preventDefault();
    setEditMode(false);
  };

  return (
    <FormWrapper
      editMode={editMode}
      onSubmit={saveChanges}
      className="flex items-start justify-between gap-2"
    >
      {editMode ? (
        <Input
          onKeyDown={onKeyDownInput}
          value={inputValue}
          onChange={onChange}
          className="bg-transparent"
          errorMessage={
            showInputError && 'Please fill the field with valid input'
          }
          ref={inputRef}
        />
      ) : isSection ? (
        <div className="w-max overflow-hidden">
          <div
            className="flex items-start gap-2 text-sm"
            title={`Open ${item.title}`}
          >
            <a
              href={RoutePaths.SECTION.replace(':sectionId', item.id)}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer font-normal text-inherit hover:text-zinc-50"
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-3 py-1"
              />
            </a>

            <span
              className="line-clamp-3 cursor-pointer gap-2 break-words text-sm hover:text-zinc-50"
              onClick={navigateToSectionPage}
            >
              {item.title}{' '}
              <span className="text-zinc-400">
                {tasks.filter((t) => t.done).length}/{tasks.length}
              </span>
            </span>
          </div>
        </div>
      ) : (
        <Checkbox
          onChange={() => toggleTaskDone(item.id)}
          checked={item.done}
          label={!editMode && item.title}
          id={item.id}
        />
      )}

      <div className="flex items-center gap-2">
        {item.pinned && !editMode && (
          <FontAwesomeIcon
            icon={faThumbtack}
            className="rotate-45 text-sm text-zinc-400"
          />
        )}

        {editMode ? (
          <div className="flex-items flex gap-1">
            {!isSection && (
              <Select
                className="w-32"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value={NO_SECTION_SELECT_VALUE}>No section</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </Select>
            )}

            <Button
              type="ghost"
              icon={faSave}
              className="w-max"
              onClick={saveChanges}
              isSubmit
            />

            <Button
              type="ghost"
              icon={faClose}
              className="w-max"
              onClick={() => setEditMode(false)}
            />
          </div>
        ) : (
          <Actions
            onDelete={() => removeItem(item.id)}
            onEdit={startEditMode}
            onPin={onPinItem}
            alreadyPinned={item.pinned}
          />
        )}
      </div>
    </FormWrapper>
  );
};

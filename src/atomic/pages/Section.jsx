import { useNavigate, useParams } from 'react-router-dom';
import { TaskList } from '../organisms/TaskList.jsx';
import { useSection } from '../../contexts/useSection.js';
import { useEffect, useRef, useState } from 'react';
import { AddForm } from '../molecules/AddForm.jsx';
import { Button } from '../atoms/Button.jsx';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { useTask } from '../../contexts/useTask.js';
import { RoutePaths } from '../../router/RoutePaths.js';
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { useVisibility } from '../../hooks/useVisibility.js';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { Input } from '../atoms/Input.jsx';
import classNames from 'classnames';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { handleClickOutside } from '../../utils/handleClickOutside.js';

const FormWrapper = ({ children, editMode, ...rest }) =>
  editMode ? (
    <form {...rest}>{children}</form>
  ) : (
    <div {...rest}>{children}</div>
  );

export const Section = () => {
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const { getSection, editSection, removeSection } = useSection();
  const { getTasksBySectionId } = useTask();

  const [section, setSection] = useState();
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [titleEditMode, setTitleEditMode] = useState(false);
  const [sectionTitleEdit, setSectionTitleEdit] = useState('');
  const [showInputError, setShowInputError] = useState(false);
  const inputRef = useRef(null);
  const deleteButtonRef = useRef(null);

  const [askingConfirmation, setAskingConfirmation] = useState(false);

  const [isHeaderInViewPort, headerRef] = useVisibility(54);

  useEffect(() => {
    setSection(getSection(sectionId));
    setTasks(getTasksBySectionId(sectionId));
    setIsLoading(false);
  }, [getTasksBySectionId, getSection, sectionId]);

  useEffect(() => {
    handleClickOutside({
      wrapperRef: deleteButtonRef,
      onClickOutside: () => setAskingConfirmation(false),
    });
  }, [deleteButtonRef]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  const onEditSectionTitle = () => {
    setTitleEditMode(true);
    setSectionTitleEdit(section.title);
  };

  const validateInput = () => {
    if (!sectionTitleEdit.trim()) {
      setShowInputError(true);
      inputRef.current.focus();
      return false;
    }
    return true;
  };

  const onDeleteSection = () => {
    removeSection(sectionId);
    navigate(RoutePaths.HOME);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }

    editSection(section.id, {
      title: sectionTitleEdit,
    });
    setTitleEditMode(false);
    setShowInputError(false);
  };

  const onCancel = () => {
    setTitleEditMode(false);
    setShowInputError(false);
  };

  const onChange = (e) => {
    setShowInputError(false);
    setSectionTitleEdit(e.target.value);
  };

  return (
    <div className="flex w-full flex-col justify-start gap-8">
      <div className="flex items-center justify-between gap-2" ref={headerRef}>
        <Button
          type="ghost"
          text="Home"
          icon={faArrowLeft}
          className="w-max"
          onClick={() => navigate(RoutePaths.HOME)}
        />
        <div className="flex items-center gap-2">
          {askingConfirmation ? (
            <div ref={deleteButtonRef}>
              <Button
                type="danger"
                text="Confirm"
                size="sm"
                icon={faExclamationCircle}
                onClick={onDeleteSection}
              />
            </div>
          ) : (
            <Button
              type="ghost"
              text="Delete"
              icon={faTrash}
              className={classNames({ hidden: askingConfirmation })}
              onClick={() => setAskingConfirmation(true)}
            />
          )}
          <Button
            type="ghost"
            text="Export"
            icon={faFileExport}
            onClick={() =>
              navigate(`${RoutePaths.EXPORT}?sectionId=${section.id}`)
            }
          />
        </div>
      </div>

      {!isHeaderInViewPort && (
        <div className="fixed left-0 right-0 top-0 z-20 animate-[fadeIn_250ms] bg-zinc-800 py-2 drop-shadow-sm">
          <div className="mx-auto flex w-full max-w-[550px] items-center justify-between gap-2 px-6">
            <span className="text-sm font-bold">{section.title}</span>
            <Button
              type="ghost"
              text="Home"
              icon={faHouse}
              className="w-max"
              onClick={() => navigate(RoutePaths.HOME)}
            />
          </div>
        </div>
      )}

      {section ? (
        <div className="flex flex-col gap-8">
          <FormWrapper
            editMode={titleEditMode}
            onSubmit={saveChanges}
            className={classNames('flex gap-2', {
              'items-start': titleEditMode,
              'items-center': !titleEditMode,
            })}
          >
            {titleEditMode ? (
              <>
                <Input
                  value={sectionTitleEdit}
                  onChange={onChange}
                  errorMessage={
                    showInputError && 'Please fill the field with valid input'
                  }
                  ref={inputRef}
                />
                <div className="flex items-center gap-1">
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
                    onClick={onCancel}
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className="line-clamp-3 break-all text-3xl font-bold">
                  {section.title}
                </h1>
                <Button
                  className="w-max"
                  type="ghost"
                  icon={faPencil}
                  onClick={onEditSectionTitle}
                />
              </>
            )}
          </FormWrapper>

          <AddForm isSectionScope sectionId={sectionId} />

          {tasks.length ? (
            <div className="flex flex-col gap-4">
              <TaskList tasks={tasks} />
            </div>
          ) : (
            <div className="mx-auto w-52 text-center">
              <span className="text-sm text-zinc-400">
                You have not created any tasks for this section
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex">
          <span className="m-auto">Section not found</span>
        </div>
      )}
    </div>
  );
};

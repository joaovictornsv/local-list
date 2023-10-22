import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSection } from '../../contexts/useSection.js';
import { useTask } from '../../contexts/useTask.js';
import { RoutePaths } from '../../router/RoutePaths.js';
import { handleClickOutside } from '../../utils/handleClickOutside.js';
import { isValidJsonString } from '../../utils/isValidJsonString.js';
import { Button } from '../atoms/Button.jsx';
import { Textarea } from '../atoms/Textarea.jsx';

const isValidJsonData = (data) => {
  if (!Array.isArray(data.sections) || !Array.isArray(data.tasks)) {
    return false;
  }

  const validTasks = data.tasks.length
    ? data.tasks.every((task) => {
        return task.title !== undefined && task.done !== undefined;
      })
    : true;
  const validSections = data.sections.length
    ? data.sections.every((task) => {
        return task.id !== undefined && task.title !== undefined;
      })
    : true;

  return !(!validTasks || !validSections);
};

export const Import = () => {
  const navigate = useNavigate();
  const [dataToImport, setDataToImport] = useState('');
  const [tasksToImport, setTasksToImport] = useState([]);
  const [sectionsToImport, setSectionsToImport] = useState([]);
  const [conflictedSections, setConflictedSections] = useState([]);

  const { importTasks } = useTask();
  const { importSections, checkImportConflicts } = useSection();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [invalidJsonData, setInvalidJsonData] = useState(false);
  const [askConfirmImport, setAskConfirmImport] = useState(false);
  const wrapperRef = useRef(null);

  const onClickOutsideCancelButton = () => {
    setAskConfirmImport(false);
  };

  useEffect(() => {
    handleClickOutside({
      wrapperRef,
      onClickOutside: onClickOutsideCancelButton,
    });
  }, [wrapperRef]);

  const validateAndParseData = (e) => {
    const data = e.target.value;
    setDataToImport(data);

    if (!isValidJsonString(data)) {
      setInvalidJsonData(true);
      return;
    }

    const parsedData = JSON.parse(data);
    if (!isValidJsonData(parsedData)) {
      setInvalidJsonData(true);
      return;
    }

    setInvalidJsonData(false);
    setTasksToImport(parsedData.tasks);
    setSectionsToImport(parsedData.sections);
    setConflictedSections(checkImportConflicts(parsedData.sections));
  };

  const importData = () => {
    importTasks(tasksToImport);
    importSections(sectionsToImport);
    setDataLoaded(true);
  };

  return (
    <div className="flex w-full flex-col justify-start gap-8">
      <div className="flex flex-col items-start gap-8">
        <Button
          type="ghost"
          text="Actions"
          icon={faArrowLeft}
          className="w-max"
          onClick={() => navigate(RoutePaths.OPTIONS)}
        />

        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Import data</h1>
            <p className="text-sm text-zinc-400">
              Paste the JSON data below to import external data
            </p>
          </div>

          <Textarea
            rows="5"
            value={dataToImport}
            onChange={validateAndParseData}
            className="resize-none"
            placeholder={`{\n\t"tasks": [{ "title": "Learning ReactJS", "done": true }],\n\t"sections": []\n}`}
          />

          {dataToImport && invalidJsonData && (
            <span className="text-sm">Invalid JSON provided.</span>
          )}

          {dataToImport && !invalidJsonData && (
            <div className="flex flex-col gap-8">
              <p>
                <span className="text-sm text-zinc-400">
                  Data to be imported:
                </span>
                <br />
                <span>
                  {tasksToImport.length} task
                  {tasksToImport.length > 1 ? 's' : ''} and{' '}
                  {sectionsToImport.length} section
                  {sectionsToImport.length > 1 ? 's' : ''}
                </span>
              </p>

              {!!conflictedSections.length && (
                <div className="rounded border border-zinc-600 bg-zinc-800 p-4">
                  <div className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mt-1.5 h-3"
                    />
                    <p>
                      <span className="text-sm text-zinc-400">
                        Conflicts found. The following sections already exist in
                        your data. Continue with the import to replace them.
                      </span>
                      <br />
                      <span className="text-sm">
                        {conflictedSections
                          .map((section) => section.title)
                          .join(', ')}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex w-full flex-col items-center gap-2">
                {dataLoaded ? (
                  <span className="flex items-center justify-center gap-2 py-4 text-sm">
                    <FontAwesomeIcon icon={faCheck} />
                    Import completed!
                  </span>
                ) : (
                  <div className="flex w-full flex-col gap-2">
                    {askConfirmImport ? (
                      <Button
                        text="Confirm"
                        ref={wrapperRef}
                        icon={faExclamationCircle}
                        onClick={importData}
                      />
                    ) : (
                      <Button
                        text="Import"
                        className="w-full"
                        onClick={() => setAskConfirmImport(true)}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

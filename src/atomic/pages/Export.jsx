import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {faCopy} from "@fortawesome/free-solid-svg-icons/faCopy";
import {useTask} from "../../contexts/useTask.js";
import {useSection} from "../../contexts/useSection.js";
import {useEffect, useState} from "react";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {Textarea} from "../atoms/Textarea.jsx";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Export = () => {
  const navigate = useNavigate()
  const {tasks, getTasksBySectionId,duplicateSectionTasks} = useTask()
  const {sections, getSection, duplicateSection} = useSection()

  const [exportData, setExportData] = useState('')
  const [copied, setCopied] = useState(false)
  const [exportingTasks, setExportingTasks] = useState([])
  const [confirmDuplicating, setConfirmDuplicating] = useState(false)
  const [duplicated, setDuplicated] = useState(false)
  const [duplicatedSectionId, setDuplicatedSectionId] = useState('')

  const [urlSearchParams] = useSearchParams()
  const {sectionId} = Object.fromEntries(urlSearchParams)

  const section = sectionId && getSection(sectionId)

  useEffect(() => {
    generateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const generateData = () => {
    const tasksToExport = sectionId
      ? getTasksBySectionId(sectionId)
      : tasks

    const sectionsToExport = sectionId
      ? [section]
      : sections

    const minifiedTasks = tasksToExport.map(({title, done, sectionId, pinned}) => ({
      title,
      done,
      ...(sectionId && {sectionId}),
      ...(pinned && {pinned})
    }))

    const data = JSON.stringify({
      tasks: minifiedTasks,
      sections: sectionsToExport
    })

    setExportData(data)
    setExportingTasks(tasksToExport)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(exportData)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
  }

  const duplicate = () => {
    if (!sectionId) {
      return
    }

    const newSectionId = duplicateSection(sectionId)
    duplicateSectionTasks({
      sectionId,
      newSectionId
    })
    setDuplicated(true)
    setDuplicatedSectionId(newSectionId)
  }

  if (!exportData) {
    return null
  }

  return (
    <div className="w-full flex flex-col justify-start gap-8">
      <div className="flex flex-col gap-8 items-start">
        <Button
          className="w-max"
          icon={faArrowLeft}
          text={sectionId ? 'Section' : 'Share'}
          type="ghost"
          onClick={() => navigate(
            sectionId
              ? RoutePaths.SECTION.replace(':sectionId', section.id)
              : RoutePaths.OPTIONS
          )}
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              Share your data
            </h1>
            <p className="text-sm text-zinc-400">
              Copy the json below to share your data with another device or browser.
              {sectionId && 'If you prefer, you can duplicate this section as well.'}
            </p>
          </div>

          {sectionId && !section ? (
            <span className="text-sm">Section not found</span>
          ): (
            <>
              <p>
                <span className="text-sm text-zinc-400">
                  You are sharing {sectionId ? (
                    <>the section <span className="text-zinc-200 font-bold">{section.title}</span>, that includes</>
                ) : 'a total of'}:
                </span><br/>
                  <span>
                  {exportingTasks.length} task{exportingTasks.length > 1 ? 's' : ''}
                    {!sectionId && (
                      <>
                        {' '}and {sections.length} section{sections.length > 1 ? 's' : ''}
                      </>
                    )}
                </span>
              </p>
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Textarea rows="5" readOnly value={exportData} className="resize-none"  />

                  <div className="flex items-center gap-2">
                    <Button
                      icon={copied ? faCheck : faCopy}
                      text={copied ? "Copied!" : "Copy"}
                      onClick={copyLinkToClipboard}
                    />
                    {sectionId && !duplicated && !confirmDuplicating&& (
                      <Button
                        text="Duplicate"
                        type="secondary"
                        onClick={() => setConfirmDuplicating(true)}
                      />
                    )}

                    {sectionId && !duplicated && confirmDuplicating && (
                      <Button
                        icon={faExclamationCircle}
                        text="Confirm"
                        type="secondary"
                        onClick={duplicate}
                      />
                    )}

                    {sectionId && duplicated && (
                      <div className="w-full px-2">
                        <p className="text-sm text-zinc-400 flex justify-center items-center gap-2">
                          <FontAwesomeIcon icon={faCheck}/>
                          <span>
                            Duplicated!{' '}
                            <Link to={`/section/${duplicatedSectionId}`} className="text-zinc-100 hover:text-zinc-50 text-sm">
                              View
                            </Link>
                          </span>
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

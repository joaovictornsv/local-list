import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {faFileImport} from "@fortawesome/free-solid-svg-icons/faFileImport";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faYoutube} from "@fortawesome/free-brands-svg-icons/faYoutube";
import {Input} from "../atoms/Input.jsx";
import {SECTION_VALUE, TASK_VALUE} from "../../hooks/useSettingsStorage.js";
import {useSettings} from "../../contexts/useSettings.js";

const DEFAULT_ITEM_NAME = 'defaultItem'

export const Options = () => {
  const { settings, changeDefaultItemToAdd } = useSettings()
  const navigate = useNavigate()

  const openRepository = () => {
    window.open("https://github.com/joaovictornsv/local-list")
  }

  const onChangeRadio = (e) => {
    changeDefaultItemToAdd(e.target.value)
  }

  return (
    <div className="w-full flex flex-col justify-start gap-8">

      <div className="flex flex-col gap-12 items-start">
        <div className="flex flex-col items-start justify-between gap-8">
          <Button
            className="w-max"
            icon={faArrowLeft}
            text="Home"
            type="ghost"
            onClick={() => navigate( RoutePaths.HOME)}
          />

          <h1 className="text-3xl font-bold">
            Options
          </h1>
        </div>


        <div className="flex flex-col gap-12 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl text-zinc-200 font-semibold">
                Default item to add
              </h2>
              <p className="text-sm text-zinc-400">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Choose you default item to add when you press "Enter" on home page form
              </p>
            </div>

            <div className="flex gap-2 items-center justify-evenly">
                <div>
                  <Input
                    type="radio"
                    label="Task"
                    name={DEFAULT_ITEM_NAME}
                    value={TASK_VALUE}
                    onChange={onChangeRadio}
                    checked={settings.defaultItemToAdd === TASK_VALUE}
                  />
                </div>
                <div>
                  <Input
                    type="radio"
                    label="Section"
                    className="focus:ring-0"
                    name={DEFAULT_ITEM_NAME}
                    value={SECTION_VALUE}
                    onChange={onChangeRadio}
                    checked={settings.defaultItemToAdd === SECTION_VALUE}
                  />
                </div>

            </div>
          </div>

          <div className="bg-zinc-700 h-px w-full" />

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl text-zinc-200 font-semibold">
                Share data
              </h2>
              <p className="text-sm text-zinc-400">
                What you want to do?
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                icon={faFileExport}
                onClick={() => navigate(RoutePaths.EXPORT)}
                text="Export data"
              />
              <Button
                type="secondary"
                onClick={() => navigate(RoutePaths.IMPORT)}
                icon={faFileImport}
                text="Import data"
              />
            </div>
          </div>

          <div className="bg-zinc-700 h-px w-full" />

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl text-zinc-200 font-semibold">
                About
              </h2>
              <p className="text-sm text-zinc-400">
                More information about this project
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="danger"
                icon={faYoutube}
                to="https://youtu.be/E84Y0TnaPQM"
                text="Presentation"
              />
              <Button
                icon={faGithub}
                onClick={openRepository}
                to="https://github.com/joaovictornsv/local-list"
                text="Repository"
                type="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

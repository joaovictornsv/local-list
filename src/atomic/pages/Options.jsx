import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {faFileImport} from "@fortawesome/free-solid-svg-icons/faFileImport";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faYoutube} from "@fortawesome/free-brands-svg-icons/faYoutube";

export const Options = () => {
  const navigate = useNavigate()

  const openRepository = () => {
    window.open("https://github.com/joaovictornsv/local-list")
  }

  return (
    <div className="w-full flex flex-col justify-start gap-8">

      <div className="flex flex-col gap-12 items-start">
        <div className="flex flex-col items-start justify-between gap-12">
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
              <h2 className="text-2xl text-zinc-200 font-semibold">
                Share data
              </h2>
              <p className="text-sm text-zinc-400">
                What you want to do?
              </p>
            </div>

            <div className="flex flex-col gap-2">
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
              <h2 className="text-2xl text-zinc-200 font-semibold">
                About
              </h2>
              <p className="text-sm text-zinc-400">
                More information about this project
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                icon={faGithub}
                onClick={openRepository}
                to="https://github.com/joaovictornsv/local-list"
                text="See repository"
                type="secondary"
              />
              <Button
                type="danger"
                disabled
                onClick={() => navigate(RoutePaths.IMPORT)}
                icon={faYoutube}
                text="Presentation (coming soon)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {faFileImport} from "@fortawesome/free-solid-svg-icons/faFileImport";

export const Share = () => {
  const navigate = useNavigate()


  return (
    <div className="w-full flex flex-col justify-start gap-8">
      <div className="flex flex-col gap-12 items-start">
        <Button
          className="w-max"
          icon={faArrowLeft}
          text="Home"
          type="ghost"
          onClick={() => navigate( RoutePaths.HOME)}
        />

        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              Share data
            </h1>
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
              type="outline"
              onClick={() => navigate(RoutePaths.IMPORT)}
              icon={faFileImport}
              text="Import data"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

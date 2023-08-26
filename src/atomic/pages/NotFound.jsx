import {Button} from "../atoms/Button.jsx";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col w-full justify-center items-center mt-16">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">
            You are lost?
          </h1>
          <p className="text-sm text-zinc-400 text-center">
            Be careful where you go...
          </p>
        </div>

        <Button
          icon={faArrowLeft} text="Return to home"
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  )
}

import {Input} from "./Input.jsx";
import {Button} from "./Button.jsx";
import {Task} from "./Task.jsx";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";

export const Section = ({
  section,
}) => (
    <p className="flex items-center gap-2 cursor-pointer hover:text-zinc-50">
      <FontAwesomeIcon className="h-3 hover:text-zinc-50" icon={faArrowUpRightFromSquare} />

      <span className="text-sm ">
        {section.title}
      </span>

    </p>
  )


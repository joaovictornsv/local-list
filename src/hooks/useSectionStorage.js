import {generateRandomUuid} from "../utils/generateRandomUuid.js";
import {useEffect, useState} from "react";
import {useTask} from "../contexts/useTask.js";

const SECTIONS_STORAGE_KEY = 'sections'
export const useSectionStorage = () => {
  const [sections, setSections] = useState([])
  const {removeTasksFromSectionId} = useTask()

  useEffect(() => {
    setSections(getSections())
  }, []);

  const getSections = () => {
    const raw = localStorage.getItem(SECTIONS_STORAGE_KEY)
    return JSON.parse(raw || '[]')
  }

  const getSection = (sectionId) => {
    return sections.find((section) => section.id === sectionId)
  }

  const saveSections = (sections) => {
    const raw = JSON.stringify(sections)
    localStorage.setItem(SECTIONS_STORAGE_KEY, raw)
    setSections(sections)
  }

  const newSection = ({ title }) => {
    saveSections([
      ...sections,
      {
        id: generateRandomUuid(),
        title: title,
      }
    ])
  }

  const removeSection = (sectionId) => {
    saveSections(
      sections.filter((section) => section.id  !== sectionId)
    )
    removeTasksFromSectionId(sectionId)
  }


  const editSection = (sectionId, { title }) => {
    saveSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          section.title = title
        }
        return section
      })
    )
  }

  return {
    sections,
    newSection,
    removeSection,
    getSection,
    editSection,
  }
}

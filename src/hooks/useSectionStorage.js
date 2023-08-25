import {generateRandomUuid} from "../utils/generateRandomUuid.js";
import {useEffect, useState} from "react";

const SECTIONS_STORAGE_KEY = 'sections'
export const useSectionStorage = () => {
  const [sections, setSections] = useState([])

  useEffect(() => {
    setSections(getSections())
  }, []);

  const getSections = () => {
    const raw = localStorage.getItem(SECTIONS_STORAGE_KEY)
    return JSON.parse(raw || '[]')
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
        tasks: []
      }
    ])
  }

  const removeSection = (sectionId) => {
    saveSections(
      sections.filter((section) => section.id  !== sectionId)
    )
  }


  return {
    sections,
    newSection,
    removeSection,
  }
}

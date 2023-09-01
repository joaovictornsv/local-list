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

  const checkImportConflicts = (newSections) => {
    const currentSectionIds = sections.map((section) => section.id)
    return newSections.filter(
      (newSection) => currentSectionIds.includes(newSection.id)
    )
  }

  const importSections = (newSections) => {
    const sectionsById = [...sections, ...newSections].reduce(
      (acc, section) => ({
        ...acc,
        [section.id]: section
      }),
      {}
    )
    saveSections(Object.values(sectionsById))
  }

  const removeSection = (sectionId) => {
    saveSections(
      sections.filter((section) => section.id  !== sectionId)
    )
    removeTasksFromSectionId(sectionId)
  }


  const editSection = (sectionId, { title, pinned }) => {
    saveSections(
      sections.map((section) =>({
          ...section,
          ...(section.id === sectionId && {
            title,
            pinned: !!pinned
          })
        })
      )
    )
  }

  return {
    sections,
    newSection,
    removeSection,
    getSection,
    editSection,
    importSections,
    checkImportConflicts
  }
}

import { useEffect, useState } from 'react';

export const TASK_VALUE = 'task';
export const SECTION_VALUE = 'section';

export const SortOptions = {
  NONE: {
    value: 'NONE',
    label: 'No sort',
    noSort: true,
  },
  DONE_ASC: {
    value: 'DONE_ASC',
    label: 'By done (asc)',
  },
  DONE_DESC: {
    value: 'DONE_DESC',
    label: 'By done (desc)',
    isDesc: true,
  },
};

const defaultSettings = {
  defaultItemToAdd: TASK_VALUE,
  sortType: SortOptions.NONE.value,
};

const SETTINGS_STORAGE_KEY = 'll_settings';
export const useSettingsStorage = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const injectDefaultValues = (settings) => ({
    ...defaultSettings,
    ...settings,
  });

  const getSettings = () => {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);

    const parsedSettings = JSON.parse(raw || '{}');
    const finalSettings = injectDefaultValues(parsedSettings);
    if (!raw) {
      saveSettings(finalSettings);
    }
    return finalSettings;
  };

  const saveSettings = (settingsToSave) => {
    const raw = JSON.stringify(settingsToSave);
    localStorage.setItem(SETTINGS_STORAGE_KEY, raw);
    setSettings(settingsToSave);
  };

  const changeDefaultItemToAdd = (defaultItemToAdd) => {
    saveSettings({
      ...settings,
      defaultItemToAdd,
    });
  };

  const changeSortType = (sortType) => {
    saveSettings({
      ...settings,
      sortType,
    });
  };

  return {
    settings,
    changeDefaultItemToAdd,
    changeSortType,
  };
};

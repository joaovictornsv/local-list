import { useTask } from '../../contexts/useTask.js';
import { useSection } from '../../contexts/useSection.js';
import { AddForm } from '../molecules/AddForm.jsx';
import { TaskList } from '../organisms/TaskList.jsx';
import { SectionList } from '../organisms/SectionList.jsx';
import { Button } from '../atoms/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../router/RoutePaths.js';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { ReactComponent as Logo } from '../../assets/logo-with-bg.svg';
import { useVisibility } from '../../hooks/useVisibility.js';

export const Home = () => {
  const navigate = useNavigate();
  const { getIndependentTasks } = useTask();
  const { sections } = useSection();

  const tasks = getIndependentTasks();

  const [isHeaderInViewPort, headerRef] = useVisibility();

  return (
    <div className="flex w-full flex-col justify-start gap-8">
      <div
        className="flex flex-col items-start justify-between gap-8"
        ref={headerRef}
      >
        <Button
          type="ghost"
          text="Options"
          icon={faBars}
          className="w-max"
          onClick={() => navigate(RoutePaths.OPTIONS)}
        />

        <div className="flex items-center gap-2">
          <Logo className="h-auto w-8" />
          <h1 className="text-3xl font-bold">LocalList</h1>
        </div>
      </div>

      {!isHeaderInViewPort && (
        <div className="fixed left-0 right-0 top-0 z-20 animate-[fadeIn_250ms] bg-zinc-800 py-2 drop-shadow-sm">
          <div className="mx-auto flex w-full max-w-[550px] items-center justify-between gap-2 px-6">
            <div className="flex items-center gap-2 self-center ">
              <Logo className="h-auto w-4" />
              <span className="text-sm font-bold">LocalList</span>
            </div>

            <Button
              type="ghost"
              text="Options"
              icon={faBars}
              className="w-max"
              onClick={() => navigate(RoutePaths.OPTIONS)}
            />
          </div>
        </div>
      )}

      <AddForm />

      <div className="flex flex-col gap-4">
        <TaskList tasks={tasks} />

        {!!tasks?.length && !!sections?.length && (
          <div className="h-px bg-zinc-500" />
        )}

        <SectionList sections={sections} />
      </div>
    </div>
  );
};

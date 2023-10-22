import { Button } from '../atoms/Button.jsx';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../router/RoutePaths.js';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Are you lost?</h1>
          <p className="text-center text-sm text-zinc-400">
            Be careful where you go.
          </p>
        </div>

        <Button
          text="Return to home"
          icon={faArrowLeft}
          onClick={() => navigate(RoutePaths.HOME)}
        />
      </div>
    </div>
  );
};

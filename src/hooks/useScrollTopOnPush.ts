// hooks/useScrollToTopOnPush.ts
import { RefObject, useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';

export const useScrollToTopOnPush = (
  ref: RefObject<HTMLElement>,
  deps: any[] = [],
) => {
  const navigationType = useNavigationType();

  useEffect(() => {
    if (ref.current && navigationType === 'PUSH') {
      ref.current.scrollIntoView({ block: 'start' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, navigationType, ...deps]);
};

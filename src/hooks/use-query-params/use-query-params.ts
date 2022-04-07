import { useLocation } from 'react-router-dom';

export const useQueryParams = (): URLSearchParams => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

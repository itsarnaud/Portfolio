import { NotFoundView } from '@/components/sections/errors/NotFoundView';

/** 404 traduite, dans le layout du site (nav et pied de page). Next la sert avec le code 404. */
export default function NotFound() {
  return <NotFoundView />;
}

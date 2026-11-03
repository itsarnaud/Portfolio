import type { Project } from '@/content/types';
import { Star } from '@/components/ui/Star';

type ProjectCoverProps = {
  project: Pick<Project, 'title' | 'number' | 'stack'>;
};

/**
 * Couverture générée pour les projets sans capture (pas de site en ligne) :
 * le numéro de la carte en très grand, le nom et la stack, dans la couleur de la carte.
 * Décorative : la carte affiche déjà ces infos.
 */
export function ProjectCover({ project }: ProjectCoverProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between p-4">
      <div className="flex items-start justify-between font-mono text-[11px] font-semibold">
        <span>{project.title}</span>
        <Star outlined fill="fill-papier" className="size-6" />
      </div>
      <p className="font-display text-[clamp(56px,30cqi,120px)] leading-[0.8] font-extrabold tracking-display">
        <span className="align-top font-mono text-[0.25em] font-semibold tracking-normal">N°</span>
        {project.number}
      </p>
      <p className="truncate font-mono text-[11px] opacity-80">{project.stack.join(' · ')}</p>
    </div>
  );
}

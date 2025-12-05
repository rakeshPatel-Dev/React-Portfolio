import Folder from '../components/ui/Folder';
import { Link } from 'react-router-dom';
import { projectData } from '@/data/projectData';

const ProjectFolder = () => {
  // create React nodes for each paper
  const items = projectData.slice(0, 3).map((project) => (
    <Link
      to={`/projects/${project.id}`}
      key={project.id}
      className="absolute inset-0 block rounded-lg overflow-hidden group cursor-pointer"
    >
      <img
        src={project.image}
        alt={project.title}
        title={project.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-2 left-2 right-2 bg-black/50 dark:bg-white/30 px-2 py-1 rounded-md">
        <h3 className="text-white dark:text-black font-semibold text-xs truncate">
          {project.title}
        </h3>
      </div>
    </Link>
  ));

  return <Folder size={2} items={items} />;
};

export default ProjectFolder;

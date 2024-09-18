import ProjectColumn from "./ProjectColumn";

const TypeColumn = ({ title, projects }) => {
  return (
    <ProjectColumn
      title={title}
      projects={projects}
      category={title.toLowerCase()}
      showAllLink={true}
      showDescription={false}
    />
  );
};

export default TypeColumn;

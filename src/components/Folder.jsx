function FolderPopup({ folder, onClose }) {
  return (
    <div className="popup">
      <div className="popup-header">
        <span>{folder.name}</span>
        <button onClick={onClose}>닫기</button>
      </div>
      <div className="icon-list popup-content">
        {folder.projects.map((project, i) => (
          <div
            key={i}
            className="icon"
            onClick={() => (window.location.href = project.url)}
          >
            <img src={project.image} alt={project.name} />
            <span>{project.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FolderPopup;

function IconList({ icons, onIconClick }) {
  return (
    <div className="icon-list">
      {icons.map((icon, i) => (
        <div key={i} className="icon" onClick={() => onIconClick(icon)}>
          <img src={icon.image} alt={icon.name} />
          <span>{icon.name}</span>
        </div>
      ))}
    </div>
  );
}
export default IconList;

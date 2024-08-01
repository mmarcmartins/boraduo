import "./styles.scss";

type ActionButtonProps = {
  title: string;
  icon?: React.ReactElement;
  onClick: VoidFunction;
  disabled?: boolean;
  className?: string;
};
export const ActionButton = ({
  icon,
  disabled,
  onClick,
  title,
  className = "",
}: ActionButtonProps) => {
  return (
    <button disabled={disabled} className={`action-button ${className}`}>
      <span className="title">{title}</span>
      {icon}
    </button>
  );
};

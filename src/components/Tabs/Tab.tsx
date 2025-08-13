import "./Tabs.css"; // Припустимо, що стилі знаходяться тут

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ label, isActive, onClick }: TabProps) => {
  return (
    <button
      className={`tab-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;

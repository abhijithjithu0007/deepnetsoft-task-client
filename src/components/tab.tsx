interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
  primary?: boolean;
}

export const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  let tabClasses =
    "py-3 px-8 font-medium text-center cursor-pointer transition-colors";

  if (active) {
    tabClasses += " bg-blue-500 text-white";
  } else {
    tabClasses += " bg-black text-white border-2 border-blue-500";
  }

  return (
    <div className={tabClasses} onClick={onClick}>
      {label}
    </div>
  );
};

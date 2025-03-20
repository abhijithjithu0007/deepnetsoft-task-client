interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
  primary?: boolean;
}

export const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  let tabClasses =
    "py-3 px-4 sm:px-8 font-medium text-center cursor-pointer transition-colors";

  if (active) {
    tabClasses += " bg-blue-500 text-white uppercase";
  } else {
    tabClasses += " bg-black text-white border border-blue-500 uppercase  ";
  }

  return (
    <div className={tabClasses} onClick={onClick}>
      {label}
    </div>
  );
};

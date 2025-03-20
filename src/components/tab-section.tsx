import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchMenus } from "../redux/features/menuSlice";
import { Tab } from "./tab";
import { Addmenu } from "./add-menu";

interface TabSectionProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  setActiveMenuId: (menuId: string) => void;
}

export const TabSection: React.FC<TabSectionProps> = ({
  activeMenu,
  setActiveMenu,
  setActiveMenuId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { menus } = useSelector((state: RootState) => state.menu);
  console.log(menus);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleClick = (menu: string, menuId: string) => {
    setActiveMenu(menu);
    setActiveMenuId(menuId);
  };

  return (
    <div className="relative w-full h-20 flex items-center justify-center bg-black bg-opacity-80">
      <div className="absolute inset-0">
        <img
          src="/assets/tabs.png"
          alt="Tabs Background"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-20 flex space-x-6 px-5 overflow-auto">
        {menus.map((menu, key) => (
          <Tab
            key={key}
            label={menu.name}
            active={activeMenu === menu.name}
            onClick={() => handleClick(menu.name, menu.id)}
          />
        ))}
      </div>

      <div className="relative z-20">
        <Addmenu />
      </div>
    </div>
  );
};

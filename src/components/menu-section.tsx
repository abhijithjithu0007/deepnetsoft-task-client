import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchMenus } from "../redux/features/menuSlice";
import { Tab } from "./tab";
import { Addmenu } from "./add-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AddMenuItems } from "./add-menu-items";

export const CombinedMenuComponent: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeMenuId, setActiveMenuId] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { menus } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    if (menus.length > 0 && !activeMenu) {
      setActiveMenu(menus[0].name);
      setActiveMenuId(menus[0].id);
    }
  }, [menus, activeMenu]);

  const handleClick = (menu: string, menuId: string) => {
    setActiveMenu(menu);
    setActiveMenuId(menuId);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Find the current active menu to display its items
  const activeMenuData = menus.find((menu) => menu.id === activeMenuId);
  const menuItems = activeMenuData?.items || [];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Tab Section */}
      <div className="relative w-full h-20 flex items-center justify-center bg-black bg-opacity-80">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/tabs.png"
            alt="Tabs Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Scroll buttons */}
        <button
          className="relative z-20 px-2 text-white opacity-80 hover:opacity-100 flex items-center justify-center"
          onClick={scrollLeft}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Tabs */}
        <div
          ref={scrollContainerRef}
          className="relative z-20 flex space-x-6 px-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {menus.map((menu, key) => (
            <Tab
              key={key}
              label={menu.name}
              active={activeMenu === menu.name}
              onClick={() => handleClick(menu.name, menu.id)}
            />
          ))}
        </div>

        {/* Scroll buttons */}
        <button
          className="relative z-20 px-2 text-white opacity-80 hover:opacity-100 flex items-center justify-center"
          onClick={scrollRight}
        >
          <ChevronRight size={24} />
        </button>

        <div className="relative z-20">
          <Addmenu />
        </div>
      </div>
      {/* Menu Section */}
      <div className="relative text-white flex-grow flex flex-col items-center justify-center p-6">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/item-bg.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        {/* Content */}
        <div className="relative border border-gray-400 p-6 w-full max-w-4xl bg-black bg-opacity-50 z-10">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider">
              <span className="inline-block mx-4">—</span>
              <span className="text-red-500">{activeMenu}</span>
              <span className="inline-block mx-4">—</span>
            </h1>
          </div>

          {/* Menu Items - Dynamically populated based on the active menu */}
          {menuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {menuItems.map((item) => (
                <MenuItemComponent
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">
                No items available in this menu
              </p>
            </div>
          )}

          {/* Add Menu Items Component */}
          <div className="flex justify-center mt-8">
            <AddMenuItems menuId={activeMenuId} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItemComponent = ({
  name,
  price,
  description,
}: {
  name: string;
  price: number;
  description: string;
}) => (
  <div className="menu-item">
    <div className="flex justify-between items-center w-full">
      <h2 className="text-lg md:text-xl font-bold whitespace-nowrap">{name}</h2>
      <div className="flex-grow border-b border-dotted border-gray-400 mx-2"></div>
      <span className="text-lg md:text-xl font-bold whitespace-nowrap">
        ${price}
      </span>
    </div>
    <p className="text-sm md:text-base text-gray-400">{description}</p>
  </div>
);

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

  const activeMenuData = menus.find((menu) => menu.id === activeMenuId);
  const menuItems = activeMenuData?.items || [];

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="relative w-full h-20 flex items-center justify-center bg-black bg-opacity-80">
        <div
          className="absolute inset-0 opacity-60 bg-black"
          style={{
            backgroundImage: "url('/assets/tabs.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "top left",
          }}
        ></div>

        <button
          className="relative z-20 px-2 text-white opacity-80 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft
            size={24}
            className="hover:scale-110 transition-transform"
          />
        </button>
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
        <button
          className="relative z-20 px-2 text-white opacity-80 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight
            size={24}
            className="hover:scale-110 transition-transform"
          />
        </button>
        <div className="relative z-20 ml-2">
          <Addmenu />
        </div>
      </div>

      <div className="relative text-white flex-grow flex flex-col items-center justify-center p-6">
        <div className="absolute inset-0">
          <img
            src="/assets/item-bg.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div className="relative border border-gray-400 p-6 md:p-8 w-full max-w-4xl bg-transparent bg-opacity-50  z-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider font-serif">
              <span className="inline-block mx-4 opacity-80">—</span>
              <span
                className="text-white text-3xl sm:text-5xl uppercase drop-shadow-md"
                style={{ textShadow: "0 0 15px rgba(255, 105, 180, 0.7)" }}
              >
                {activeMenu}
              </span>
              <span className="inline-block mx-4 opacity-80">—</span>
            </h1>
          </div>
          {menuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
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
            <div className="text-center py-16">
              <p className="text-xl text-gray-400 italic">
                No items available in this menu
              </p>
            </div>
          )}
          <div className="flex justify-center mt-10">
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
  <div className="menu-item group hover:translate-y-px transition-all duration-300">
    <div className="flex justify-between items-center w-full mb-2">
      <h2 className="text-lg md:text-xl uppercase font-bold whitespace-nowrap font-serif">
        {name}
      </h2>
      <div className="flex-grow border-b border-dotted border-gray-400 mx-2 opacity-70"></div>
      <span className="text-lg md:text-xl font-bold whitespace-nowrap">
        ${price.toFixed(2)}
      </span>
    </div>
    <p className="text-sm md:text-base uppercase text-gray-400 font-light leading-relaxed">
      {description}
    </p>
  </div>
);

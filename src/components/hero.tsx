export const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-black min-h-[400px]">
      <div className="absolute inset-0">
        <img
          src="/assets/menu-bg.jpeg"
          alt="Food background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black opacity-65"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 py-16">
        <h1
          className="text-white text-3xl sm:text-7xl font-bold mb-4"
          style={{ textShadow: "0 0 15px rgba(255, 105, 180, 0.7)" }}
        >
          MENU
        </h1>{" "}
        <p className="text-gray-400 text-lg max-w-xl">
          Please take a look at our menu featuring food, drinks, and brunch. If
          you'd like to place an order, use the "Order Online" button located
          below the menu.
        </p>
      </div>
    </div>
  );
};

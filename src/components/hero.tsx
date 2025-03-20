export const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-black min-h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/menu-bg.jpeg"
          alt="Food background"
          className="w-full h-full object-cover object-top"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 py-16">
        <h1 className="text-white text-7xl font-bold mb-4">MENU</h1>
        <p className="text-white text-lg max-w-xl">
          Please take a look at our menu featuring food, drinks, and brunch. If
          you'd like to place an order, use the "Order Online" button located
          below the menu.
        </p>
      </div>
    </div>
  );
};

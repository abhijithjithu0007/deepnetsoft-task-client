export default function Footer() {
  return (
    <div className="bg-black/90 text-gray-500 py-2 px-1 flex flex-col text-sm md:flex-row items-center justify-around text-center md:text-left">
      <p className="mb-4 md:mb-0">
        © 2024 Deepnetsoft Solutions. All rights reserved.
      </p>

      <ul className="flex gap-4">
        <li className="cursor-pointer hover:text-gray-400 transition">
          Terms & Conditions
        </li>
        <li className="cursor-pointer hover:text-gray-400 transition">
          Privacy Policy
        </li>
      </ul>
    </div>
  );
}

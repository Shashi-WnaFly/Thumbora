import { MenuIcon, XIcon } from "lucide-react";
import Logo from "../../public/assets/Logo";
import { navLinks } from "../data/navLinks";
import type { INavLink } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div
      className={` h-18 w-full top-0 fixed z-30 flex justify-between items-center px-6 md:px-16 lg:px-24 xl:px-32 ${!isMenuOpen && "backdrop-blur"}`}
    >
      <div className="flex items-center">
        <div
          className="w-10 h-10 p-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Logo />
        </div>
        <h3 className="text-2xl font-semibold">Thumbora</h3>
      </div>
      <div className="hidden md:flex gap-6 text-md transition duration-500">
        {navLinks.map((link: INavLink) => (
          <Link
            key={link.name}
            to={link.to}
            className="border-b-4 border-transparent hover:border-orange-600 transition active:text-orange-500 duration-300"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <button className="hidden md:block bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700">
        Get Started
      </button>
      <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
        <MenuIcon className="active:scale-90 transition" size={24} />
      </button>
      <div
        className={`fixed inset-0 bg-black/40 flex flex-col w-full h-screen z-100 backdrop-blur justify-center items-center md:hidden gap-6 text-md transform duration-400
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        {navLinks.map((link: INavLink) => (
          <Link
            key={link.name}
            to={link.to}
            onClick={() => setIsMenuOpen(false)}
            className="border-b-4 border-transparent hover:border-orange-600 transition active:text-orange-500 duration-300"
          >
            {link.name}
          </Link>
        ))}
        <button
          className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-700"
          onClick={() => setIsMenuOpen(false)}
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}

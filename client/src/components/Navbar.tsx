import React from "react";
import { navLinks } from "../data/navLinks";
import type { INavLink } from "../types";
import Logo from "../assets/Logo";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className=" h-18 w-full absolute z-30 flex justify-between items-center px-20">
      <div className="flex items-center">
        <div
          className="w-16 h-14 p-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Logo />
        </div>
        <h3 className="text-2xl font-semibold">Thumbora</h3>
      </div>
      <div className="flex gap-6 text-md ">
        {navLinks.map((link: INavLink) => (
          <Link
            key={link.name}
            to={link.to}
            className="border-b-4 border-transparent hover:border-orange-600 transition-colors active:text-orange-500 duration-300"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <button className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700">
        Get Started
      </button>
    </div>
  );
}

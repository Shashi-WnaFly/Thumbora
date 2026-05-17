import { MenuIcon, XIcon } from "lucide-react";
import Logo from "../../public/assets/Logo";
import { navLinks } from "../data/navLinks";
import type { INavLink, IStore } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../configs/api";
import { removeUser } from "../utils/userSlice";
import useToast from "../hooks/useToast";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const user = useSelector((store: IStore) => store.user);
  const { showToast } = useToast();

  // bug : when we click burger icon at big screen blur effect compromised because of single state variable isMenuOpen

  const handleLogout = async () => {
    try {
      if (user) {
        const { data } = await api.post("/logout");
        dispatch(removeUser());
        showToast("success", data.message);
      }
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={` h-18 w-full top-0 fixed z-30 flex justify-between items-center px-6 md:px-16 lg:px-24 xl:px-32 ${!isMenuOpen && "backdrop-blur"}`}
    >
      <div
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer"
      >
        <div className="w-10 h-10 p-2">
          <Logo />
        </div>
        <h3 className="text-2xl font-semibold">Thumbora</h3>
      </div>
      <div className="hidden md:flex gap-6 text-md transition duration-500">
        {navLinks.map((link: INavLink) => {
          if (link.name === "Logout" || link.name == "Password Change") return;
          return (
            <Link
              key={link.name}
              to={link.to}
              className="border-b-4 border-transparent hover:border-orange-600 transition active:text-orange-500 duration-300"
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="relative hidden md:block transition ">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white px-4 py-2 rounded-full"
        >
          <MenuIcon className="active:scale-90 " size={24} />
        </button>
        {isMenuOpen && (
          <div className="absolute top-10 flex flex-col text-nowrap left-auto right-0">
            {user && (
              <>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 text-left rounded-sm hover:bg-orange-500"
                >
                  Logout
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/password-change");
                  }}
                  className="px-2 py-1 text-left rounded-sm hover:bg-orange-500"
                >
                  Change Password
                </button>
              </>
            )}
            {!user && (
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  navigate("/login");
                }}
                className="px-2 py-1 text-left rounded-sm hover:bg-orange-500"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
      <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
        <MenuIcon className="active:scale-90 transition" size={24} />
      </button>
      <div
        className={`fixed inset-0 bg-black/40 flex flex-col w-full h-screen z-100 backdrop-blur justify-center items-center md:hidden gap-6 text-md transform duration-400
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        {navLinks.map((link: INavLink) => {
          return (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="border-b-4 border-transparent hover:border-orange-600 transition active:text-orange-500 duration-300"
            >
              {link.name}
            </Link>
          );
        })}
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

import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import SidebarButton from "./button/SidebarButton";
import { BiLogIn } from "react-icons/bi";
import { useAuth } from "../../hooks/OwnAuth";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  toggleFunc: () => void;
  isOpen: boolean;
};

function SideBar({ children, toggleFunc, isOpen }: Props) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed h-full w-1/4 shadow-xl transition ${
        isOpen ? "" : "-translate-x-full"
      }`}
    >
      <button
        onClick={toggleFunc}
        className="bg-white hover:shadow-lg hover:-translate-x-2 transition shadow-md h-20 w-8 absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <HiChevronLeft
          className={`h-8 w-8 text-gray-600 ${!isOpen && "rotate-180"}`}
        />
      </button>

      {isLoggedIn}

      <div className="w-[calc(100%-1rem)] bg-white relative mx-2 mt-4">
        {!isLoggedIn && (
          <SidebarButton
            text="Log In"
            icon={BiLogIn}
            iconStyle="text-primary-blue"
            onClick={() => navigate("/login")}
          />
        )}
        {isLoggedIn && (
          <SidebarButton
            text="Log Out"
            icon={BiLogIn}
            iconStyle="text-primary-blue"
            onClick={logout}
          />
        )}
        {children}
      </div>
    </aside>
  );
}

export default SideBar;

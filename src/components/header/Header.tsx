import React from "react";
import Nav from "./Nav";

function Header() {
  
  return (
    <header className="fixed bg-white z-50 w-full flex justify-between px-6 items-center h-24 shadow-lg">
      <div>Logo</div>

      <Nav />
    </header>
  );
}

export default Header;

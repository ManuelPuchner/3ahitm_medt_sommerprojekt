import React from "react";
import { NavLink } from "react-router-dom";

const navElements = [
  { href: "/", text: "Home" },
  { href: "/login", text: "Login" },
  { href: "/howto", text: "HowTo" },
  { href: "/wichtig", text: "Wichtig" },
];

const colors = ["#004F9F", "#6CB6DD", "#F39200", "#BE1622"];

function Nav() {
  return (
    <nav>
      <ul className="flex">
        {navElements.map((element, index) => (
          <NavElement
            key={index}
            {...element}
            color={colors[index % 4]}
          ></NavElement>
        ))}
      </ul>
    </nav>
  );
}

type NavElementProps = {
  href: string;
  text: string;
  color?: string;
};

function NavElement({ href, text, color }: NavElementProps) {
  return (
    <li className={`m-2 p-2 italic`} style={{ color }}>
      <NavLink
        to={href}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "font-bold not-italic" : ""
        }
      >
        {text}
      </NavLink>
    </li>
  );
}

export default Nav;

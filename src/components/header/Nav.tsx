import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/OwnAuth";

enum ShowWhen {
  LOGGED_IN,
  LOGGED_OUT,
  ALWAYS,
}

const navElements = [
  { href: "/", text: "Home", showWhen: ShowWhen.ALWAYS },
  { href: "/login", text: "Login", showWhen: ShowWhen.LOGGED_OUT },
  { href: "/account/", text: "Mein Account", showWhen: ShowWhen.LOGGED_IN },
  { href: "/howto", text: "HowTo", showWhen: ShowWhen.ALWAYS },
  { href: "/wichtig", text: "Wichtig", showWhen: ShowWhen.ALWAYS },
];

const colors = ["#004F9F", "#6CB6DD", "#F39200", "#BE1622"];

function Nav() {
  const { isLoggedIn } = useAuth();
  

  return (
    <nav>
      <ul className="flex">
        {navElements.map(
          (element, index) =>
            (element.showWhen === ShowWhen.ALWAYS ||
              (element.showWhen === ShowWhen.LOGGED_IN && isLoggedIn) ||
              (element.showWhen === ShowWhen.LOGGED_OUT && !isLoggedIn)) && (
              <NavElement
                key={index}
                {...element}
                color={colors[index % 4]}
              ></NavElement>
            )
        )}
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

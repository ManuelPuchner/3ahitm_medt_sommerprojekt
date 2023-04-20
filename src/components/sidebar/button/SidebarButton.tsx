import React from "react";
import { IconType } from "react-icons";

type SidebarButtonProps = {
  text: string;
  icon?: IconType;
  onClick?: () => void;
  iconStyle?: string;
};

function SidebarButton({ text, icon, onClick, iconStyle }: SidebarButtonProps) {
  return (
    <button
      className="mb-2 px-4 py-3 relative border-gray-200 border-1 w-full shadow-sm hover:shadow-md hover:-translate-y-1 transition"
      onClick={onClick}
    >
      {icon && (
        <div className="icon-wrapper fixed">
          {icon({ className: "h-6 w-6 " + iconStyle || "" })}
        </div>
      )}
      {text}
    </button>
  );
}

export default SidebarButton;

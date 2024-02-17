'use client'
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/constants";

interface SubMenuProps {
  menu: MenuItem[];
}

interface CreateMenuProps {
  item: MenuItem;
  depth: number;
  menustatus: number[];
  setMenuStatus: React.Dispatch<React.SetStateAction<number[]>>;
  myref: React.MutableRefObject<HTMLLIElement>;
  onMouseLeave: () => void;
  clearLeaveTimeout: () => void;
}

const SubMenu: React.FC<SubMenuProps> = ({ menu }) => {
  const myref = useRef<HTMLLIElement>(null!);
  const [menustatus, setMenuStatus] = useState<number[]>([]);
  const [leaveTimeout, setLeaveTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    function removeMenu(event: MouseEvent) {
      if (myref.current && !myref.current.contains(event.target as Node)) {
        if (leaveTimeout) {
          clearTimeout(leaveTimeout);
          setLeaveTimeout(null);
        }
        setMenuStatus([]);
      }
    }

    window.addEventListener("mousedown", removeMenu);

    return function cleanupListener() {
      window.removeEventListener("mousedown", removeMenu);
    };
  }, [leaveTimeout]);

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setMenuStatus([]);
    }, 2000); // 200 milisaniye bekleyecek

    setLeaveTimeout(timeout);
  };

  const clearLeaveTimeout = () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
  };

  useEffect(() => {
    return () => {
      clearLeaveTimeout();
    };
  }, []);

  return (
    <div>
      <ul className="flex justify-center items-center">
        {menu.map((item) => (
          <CreateMenu
            key={item.id}
            item={item}
            depth={0}
            menustatus={menustatus}
            setMenuStatus={setMenuStatus}
            myref={myref}
            onMouseLeave={handleMouseLeave}
            clearLeaveTimeout={clearLeaveTimeout}
          />
        ))}
      </ul>
    </div>
  );
};

const CreateMenu: React.FC<CreateMenuProps> = ({
  item,
  depth,
  menustatus,
  setMenuStatus,
  myref,
  onMouseLeave,
  clearLeaveTimeout,
}) => {
  const handleMouseEnter = (item: MenuItem, depth: number) => {
    if (depth === 0) {
      setMenuStatus([]);
    }

    if (item.submenu) {
      setMenuStatus((oldArray) => [...oldArray, item.id]);
    }

    clearLeaveTimeout();
  };

  return (
    <li
      ref={myref}
      onMouseEnter={(e) => handleMouseEnter(item, depth)}
      onMouseLeave={onMouseLeave}
      className="relative border-2 border-gray-300 px-3 py-2 bg-black text-white"
    >
      <Link href={item.path}>{item.name}</Link>

      {item.submenu && (
        <ul
          className={`${
            menustatus.find((v) => v === item.id) ? "block" : "hidden"
          }  ${
            depth === 0 ? "top-10 left-0" : "left-0 top-0 ml-[calc(100%)]"
          } absolute`}
        >
          {item.submenu.map((subitem) => (
            <CreateMenu
              key={subitem.id}
              item={subitem}
              depth={depth + 1}
              menustatus={menustatus}
              setMenuStatus={setMenuStatus}
              myref={myref}
              onMouseLeave={onMouseLeave}
              clearLeaveTimeout={clearLeaveTimeout}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SubMenu;
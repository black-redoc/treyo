"use client";
import { useContext } from "react";
import { DispatchContext, StateContext } from "../contexts/states";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Dropdown() {
  const pathname = usePathname();
  const { projectFormDispatch } = useContext(DispatchContext);
  const { authState } = useContext(StateContext);
  const getInitials = () => {
    return authState.user.email
      ? authState.user.email.substring(0, 2).toUpperCase()
      : authState.user.username?.substring(0, 2).toUpperCase();
  };
  const isLoggedIn = () =>
    Boolean(authState.user.email) || Boolean(authState.user.username);
  const createNewProject = () => {
    projectFormDispatch({ type: "OPEN_FORM" });
  };
  return (
    <>
      {!isLoggedIn() ? (
        <></>
      ) : (
        <div className="relative dropdown">
          <button role="button" className="bg-slate-800 rounded-3xl size-8 relative mr-2">
            <p className="text-cyan-100 font-medium shadow-cyan-790">
              {getInitials()}
            </p>
            <svg
              className="fill-current h-4 w-4 absolute right-0 bottom-0 text-white translate-x-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z" />
            </svg>
          </button>
          <ul className="absolute dropdown-content hidden text-gray-700 pt-1 w-24 bg-white border rounded shadow-lg py-1 -translate-x-12">
            <li
              className={`
              w-22
              ${
                pathname.endsWith("/")
                  ? " pointer-events-none text-gray-500"
                  : ""
              }
              `}
            >
              <Link
                href="/"
                className={
                  "disabled rounded-t bg-gray-200 hover:bg-gray-500 hover:text-white py-2 px-4 block whitespace-no-wrap"
                }
              >
                Index
              </Link>
            </li>
            <li className="w-22 mt-1">
              <Link
                href="/"
                onClick={createNewProject}
                className="rounded-t bg-gray-200 hover:bg-gray-500 hover:text-white py-2 px-4 block whitespace-no-wrap"
              >
                Create project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

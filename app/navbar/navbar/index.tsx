import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { setName } from "@/app/GlobalRedux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Navbar = ({ toggle }: { toggle: () => void }) => {
  const user = useSelector((state: any) => state.user.userInfo);

  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full h-20 bg-blue-500 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
            <ul className="hidden md:flex gap-x-4 text-white ">
              <li>
                <Link href="/home">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/book">
                  <p>Book</p>
                </Link>
              </li>
              {user === null ? (
                <li className="grid grid-cols-2">
                  <Link href="/login">
                    <p>Log in</p>
                  </Link>
                  <Link href="/signup">
                    <p>Sign up</p>
                  </Link>
                </li>
              ) : (
                <li className="grid grid-cols-2">
                  <p>{`Hi ${user.clients.Fname}`}</p>
                  <Link href="/" onClick={() => dispatch(setName(null))}>
                    <p>Log out</p>
                  </Link>
                </li>
              )}
            </ul>
            {/* <div className="hidden md:block">
              <Button />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

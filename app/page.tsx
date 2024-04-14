import Image from "next/image";
import logo from "../public/logo.svg";
import NavBar from "./navbar/comment/page";
export default function Home() {
  return (
    <>
      <NavBar />
      <div className="bg-black grid grid-cols-2">
        <div className="w-1/3">
          <p className="text-white text-3xl">Contacts</p>
        </div>
        <div className="grid h-screen place-items-center w-2/3 auto-rows-auto p-24">
          <Image src={logo} alt="Chat App" width="80" height="80" />
          <h1
            className="text-5xl font-bold text-gray-900
        dark:text-white"
          >
            Welcome to ChatApp
          </h1>
          <p className="text-s text-gray-600">
            Send and receive messages without keeping your phone online. <br />
            Use ChatApp on every device every Where all at the same time.
          </p>
        </div>
      </div>
    </>
  );
}

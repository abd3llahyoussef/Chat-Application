"use client";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../GlobalRedux/features/userSlice";
import { useRouter } from "next/navigation";
import { getUser } from "../GlobalRedux/features/userSlice";
import "../app.css";

interface user {
  password: string;
  email: string;
}
export default function Login() {
  const [userState, setUserState] = useState<user>({
    password: "",
    email: "",
  });

  const navigate = useRouter();
  const userData = useSelector((state: any) => state.user.loginUser);
  const dispatch = useDispatch<any>();

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const getUserData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo = await dispatch(getUser(userState));
    console.log(userInfo.payload);
    console.log(userInfo.payload.clients);
    if (userState.email === userInfo.payload.clients.email) {
      dispatch(setName(userInfo.payload.clients.Fname));
      toast.success(
        `Logged In Successfully, hello ${userInfo.payload.clients.Fname}`,
        {
          position: "top-center",
        }
      );
      navigate.push("/");
    } else {
      toast.error("email or Password is Wrong", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="image">
      <TrackVisibility>
        {({ isVisible }) => (
          <div
            className={
              isVisible ? "animate__animated animate__slideInDown log-in" : ""
            }
          >
            <Container className="flex justify-center items-center">
              <Row>
                <Col size={12} md={6}>
                  <form onSubmit={getUserData} className="grid grid-cols-1">
                    <div className="grid grid-cols-2">
                      <div>
                        <label htmlFor="email">Email</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="w-2/3 h-11/12 border-2 border-black bg-white rounded-3xl text-black ml-1 px-2 py-3 font-medium text-base tracking-normal ease-out"
                          placeholder="Enter email"
                          value={userState.email || ""}
                          onChange={handleInputs}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div>
                        <label htmlFor="password">Password</label>
                      </div>
                      <div>
                        <input
                          type="Password"
                          id="password"
                          name="password"
                          className="w-2/3 h-11/12 border-2 border-black bg-white rounded-3xl text-black ml-1 px-2 py-3 font-medium text-base tracking-normal ease-out"
                          placeholder="Enter Password"
                          value={userState.password || ""}
                          onChange={handleInputs}
                        />
                      </div>
                    </div>
                    <button type="submit">
                      <span>Submit</span>
                    </button>
                  </form>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </TrackVisibility>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "animate.css";
import { create } from "../GlobalRedux/features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../app.css";

interface user {
  Fname: string;
  Lname: string;
  email: string;
  password: string;
}
export default function Signup() {
  const [user, setUser] = useState<user>({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch<any>();
  const handleInputs = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };
  const storeData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      //post user data
      e.preventDefault();
      console.log(user);
      const result = await dispatch(create(user));
      toast.success("Registered Successfully", {
        position: "top-right",
      });
    } catch (err) {
      toast.error("Registered Successfully", {
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
              isVisible ? "animate__animated animate__fadeInDown sign-up" : ""
            }
          >
            <Container className="flex justify-center items-center">
              <Row>
                <Col size={12} md={6}>
                  <form onSubmit={storeData} className="grid grid-cols-1">
                    <ToastContainer />
                    <div className="grid grid-col-2">
                      <div className="grid grid-col-2">
                        <div>
                          <label htmlFor="FirstName">First Name</label>
                        </div>
                        <div>
                          <input
                            type="text"
                            id="FirstName"
                            name="Fname"
                            className="w-2/3 h-11/12 border-2 border-black bg-white rounded-3xl text-black ml-1 px-2 py-3 font-medium text-base tracking-normal ease-out"
                            placeholder="Enter FirstName"
                            value={user.Fname}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>
                      <div className="grid grid-col-2">
                        <div>
                          <label htmlFor="LastName">Last Name</label>
                        </div>
                        <div>
                          <input
                            type="text"
                            id="LastName"
                            name="Lname"
                            className="w-2/3 h-11/12 border-2 border-black bg-white rounded-3xl text-black ml-1 px-2 py-3 font-medium text-base tracking-normal ease-out"
                            placeholder="Enter LastName"
                            value={user.Lname}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-col-2">
                      <div className="grid grid-col-2">
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
                            value={user.email}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>
                      <div className="grid grid-col-2">
                        <div>
                          <label htmlFor="Password">Password</label>
                        </div>
                        <div>
                          <input
                            type="Password"
                            id="Password"
                            name="password"
                            className="w-2/3 h-11/12 border-2 border-black bg-white rounded-3xl text-black ml-1 px-2 py-3 font-medium text-base tracking-normal ease-out"
                            placeholder="Enter Password"
                            value={user.password}
                            onChange={handleInputs}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div>
                        <label htmlFor="country">Country</label>
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

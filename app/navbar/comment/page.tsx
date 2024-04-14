"use client";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../GlobalRedux/features/userSlice";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import "../../app.css";
export default function NavBar() {
  const [active, setactive] = useState("Home");
  const [scrolled, setscrolled] = useState(false);

  const user = useSelector((state: any) => state.user.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setscrolled(true);
      } else {
        setscrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const activeLink = (value: string) => {
    setactive(value);
  };

  return (
    <React.Fragment>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <Image
              src={logo}
              alt="logo"
              width="10"
              height="20"
              className="inline"
            />
            <p className="inline" id="logo-1">
              Airport
            </p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link
                href="/home"
                className={
                  active === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => activeLink("home")}
              >
                Home
              </Link>
              <Nav.Link
                href="/book"
                as={Link}
                className={
                  active === "book" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => activeLink("book")}
              >
                Book
              </Nav.Link>
              <div className="mx-1">
                {user === null ? (
                  <span>
                    <Nav.Link
                      href="/login"
                      as={Link}
                      className={
                        active === "Login"
                          ? "active navbar-link"
                          : "navbar-link"
                      }
                      onClick={() => activeLink("Login")}
                    >
                      Log in
                    </Nav.Link>
                    <Nav.Link
                      href="/signup"
                      as={Link}
                      className={
                        active === "sign up"
                          ? "active navbar-link"
                          : "navbar-link"
                      }
                      onClick={() => activeLink("sign up")}
                    >
                      sign up
                    </Nav.Link>
                  </span>
                ) : (
                  <span>
                    <p className="mt-2">{`Hi ${user.clients.Fname}`}</p>
                    <Nav.Link
                      href="/"
                      as={Link}
                      className={
                        active === "Logout"
                          ? "active navbar-link"
                          : "navbar-link"
                      }
                      onClick={() => dispatch(setName(null))}
                    >
                      Log out
                    </Nav.Link>
                  </span>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

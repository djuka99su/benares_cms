"use client;";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModalCategory from "../menyCards/ModalCategory";
import ModalItem from "../menyCards/ModalItem";
import ModalRemove from "../menyCards/ModalRemove";
import { auth } from "../../app/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const links = [
  { name: "Forside", href: "/", target: "_self" },
  { name: "Meny", href: "/meny", target: "_self" },
  { name: "Om oss", href: "/om-oss", target: "_self" },
  {
    name: "Levering",
    href: "https://dinehome.no/detail/benares-indisk-restaurant",
    target: "_blank",
  },
  {
    name: "Book Table",
    href: "https://book.easytablebooking.com/book/?id=ac795&lang=no&_gl=1*10n2e8o*_gcl_aw*R0NMLjE3MDIyMDMyNjcuQ2owS0NRaUE0TldyQmhELUFSSXNBRkNLd1d1OHNtX2JseGVBMFRoUTNmbkFGcUdKX29FRGN4LVVlMDN5VzNjYzJKR0tXX1hnR2xnWFBEd2FBc0lrRUFMd193Y0I.*_gcl_au*NTM5NDg3MjY0LjE2OTkwMzU3OTY.&_ga=2.56697826.934400267.1702124835-750787018.1699035797&_gac=1.195582558.1702203268.Cj0KCQiA4NWrBhD-ARIsAFCKwWu8sm_blxeA0ThQ3fnAFqGJ_oEDcx-Ue03yW3cc2JGKW_XgGlgXPDwaAsIkEALw_wcB",
    target: "_blank",
  },
];


const Navbar = () => {
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [scrolling, setScrolling] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const authStateChangedListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      }
    });
  
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(false);
      } else {
        setScrolling(true);

      }
    };
  
    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    // Cleanup functions
    return () => {
      authStateChangedListener(); // Remove the auth state change listener
      window.removeEventListener('scroll', handleScroll); // Remove the scroll event listener
    };
  }, []);
  

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div
      className={
        scrolling ? styles.navbarContainer : styles.navbarContainerScrolled
      }
    >
      <nav className={scrolling ? styles.navbar : styles.navbarScrolled}>
        <div>
          <a className={styles.logo} href="/" id="logo">
            <span className="text-orange-600">Be</span>nares
          </a>
        </div>
        <button
          className={styles.toggleBtn}
          onClick={() => setCategoryToggle(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className={styles.links}>
          {links.map((link) => (
            <Link
              className={styles.navLink}
              key={link.name}
              href={link.href}
              target={link.target}
            >
              {link.name}
            </Link>
          ))}
          {authUser ? (
            <button className={styles.navLink} onClick={userSignOut}>
              Logg ut
            </button>
          ) : (
            <a className={styles.navLink} href="/login">
              Logg in
            </a>
          )}
        </div>
      </nav>
      <div className={categoryToggle ? styles.overlay : "hidden"}>
        <XIcon
          onClick={() => setCategoryToggle(false)}
          className={styles.closeButton}
          width={40}
          height={40}
        />
        <div className={styles.overlayLinks}>
          {links.map((link) => (
            <a key={link.name} href={link.href}>
              <button className={styles.navLink}>{link.name}</button>
            </a>
          ))}
          {authUser ? (
            <button className={styles.navLink} onClick={userSignOut}>
              Logg ut
            </button>
          ) : (
            <a className={styles.navLink} href="/login">
              Logg in
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

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

const getCategories = () => {
  return fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

const Navbar = () => {
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [scrolling, setScrolling] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownTwo, setDropdownTwo] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authUser, setAuthUser] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    // window.scrollTo(0, 0);
    getCategories().then((data) => setCategories(data.categories));
    const handleScroll = () => {
      // Check if the user has scrolled down by a certain amount (e.g., 100 pixels)
      const isScrolled = window.scrollY === 0;

      // Update the state based on the scroll position
      setScrolling(isScrolled);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      listen();
    };
  }, []); //Scroll event

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleArrowUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeModal = () => {
    setModal(false);
    setModalItem(false);
    setModalRemove(false);
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
            Benares
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
          {authUser ? <button className={styles.navLink} onClick={userSignOut}>Logg ut</button>: <a  className={styles.navLink} href="/login">Logg in</a>}
          {pathName === "/meny" && authUser && (
            <div>
              <button
                id="dropdownHoverButton"
                className="text-white mr-2 bg-orange-600  focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                Category{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                id="dropdownHover"
                className={`z-10 ${
                  !dropdown && "hidden"
                } bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:bg-opacity-80`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <a
                      onClick={() => setModal(true)}
                      className="block px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer  "
                    >
                      Create Category
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2  cursor-pointer hover:bg-gray-700 hover:text-white">
                      Edit Category
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setModalRemove(true)}
                      className="block px-4 py-2 = cursor-pointer hover:bg-gray-700 hover:text-white"
                    >
                      Delete Category
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {pathName === "/meny" && authUser && (
            <div>
              <button
                id="dropdownHoverButton"
                className="text-white bg-orange-600  focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onMouseEnter={() => setDropdownTwo(true)}
                onMouseLeave={() => setDropdownTwo(false)}
              >
                Item{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                onMouseEnter={() => setDropdownTwo(true)}
                onMouseLeave={() => setDropdownTwo(false)}
                id="dropdownHover"
                className={`z-10 ${
                  !dropdownTwo && "hidden"
                } bg-white absolute  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:bg-opacity-80`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <a
                      onClick={() => setModalItem(true)}
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Create Item
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                      Edit Item
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                      Delete Item
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
              <button
                className={
                  styles.navLink
                }
              >
                {link.name}
              </button>
            </a>
          ))}
          {authUser ? <button className={styles.navLink} onClick={userSignOut}>Logg ut</button>: <a  className={styles.navLink} href="/login">Logg in</a>}
        </div>
      </div>

      {/* {!scrolling && (
        <button onClick={handleArrowUp}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.arrowButton}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )} */}
      <ModalCategory modal={modal} closeModal={closeModal} />
      <ModalItem
        modal={modalItem}
        categories={categories}
        closeModal={closeModal}
      />
      <ModalRemove modal={modalRemove} closeModal={closeModal} />
    </div>
  );
};

export default Navbar;

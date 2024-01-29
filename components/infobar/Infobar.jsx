"use client ";
import React, {useEffect, useState} from "react";
import { PhoneIcon } from "@heroicons/react/solid";
import styles from "./styles.module.css";
import { auth } from "../../app/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Infobar = () => {

  const[authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {listen();}
  },[]);

  return (
    <div className={styles.infoBar}>
      <ul className={styles.list}>
        <li className="flex">
          <PhoneIcon className="w-4 h-4" />
          <span>+47/999-99-999</span>
        </li>
        {authUser && <li>Velkommen <span className="underline">{authUser.email}</span></li>}
        <li>Åpnet: Mandag-Søndag 08:00- 23:00</li>
      </ul>
    </div>
  );
};

export default Infobar;

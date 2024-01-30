"use client";

import React from "react";
import bgImage from "../../public/images/bgImage_03.jpg";
import Image from "next/image";
import styles from "./styles.module.css";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/")
      }
    });

    return () => {listen();}
  },[]);


  const resetPassowrd = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        toast.success("Medlingen har blitt sendt. Sjekk e-posten din.")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.body}>
      <Image src={bgImage} alt="Loading..." className={styles.bgImageLogin} />
      <div className={styles.container}>
        <h2 className="text-orange-600 text-center text-6xl mb-5 p-4 font-bold">
          Tilbakestill passordet
        </h2>
        <p className="text-white text-center text-xl mb-5 p-4 ">Vi sender deg en e-post for å tilbakestille passordet</p>
        <form
          onSubmit={resetPassowrd}
          className="flex flex-col gap-6 mb-6 rounded p-10"
        >
          <div className="flex flex-col gap-1 text-center">
            <label htmlFor="email" className="text-white  text-lg">
              Email
            </label>

            <input
              type="text"
              id="email"
              name="emailA"
              className="rounded p-2 mt-1 w-64 focus:ring-4 focus:outline-none focus:ring-orange-600"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-orange-600 rounded p-2 w-24 m-auto"
          >
            Send inn
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;

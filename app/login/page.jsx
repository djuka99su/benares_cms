"use client";

import React from "react";
import bgImage from "../../public/images/bgImage_03.jpg";
import Image from "next/image";
import styles from "./styles.module.css";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { set } from "mongoose";
import { auth } from "../firebase";
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { useRouter } from "next/navigation";

const page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const notify = () => {
    toast(
      <div>
        <p className="font-bold">admin@gmail.com</p>
        <br />
        <p className="font-bold">R#9aLp2qFv$5sJ8</p>
      </div>
    );
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/")
      } 
    });
     notify()
  }, []);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      router.push('/')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className={styles.body}>
      <Image src={bgImage} alt="Loading..." className={styles.bgImageLogin} />
      <div className={styles.container}>
        <h2 className="text-orange-600 text-center text-6xl mb-5 p-4 font-bold">
          Sign In
        </h2>
        <form onSubmit={signIn} className="flex flex-col gap-6 mb-6 rounded p-10">
          <div className="flex flex-col gap-1 text-center">
            <label htmlFor="email" className="text-white font-bold text-lg">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="rounded p-2 mt-1 focus:ring-4 focus:outline-none focus:ring-orange-600"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <label htmlFor="password" className="text-white font-bold text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="rounded p-2 mt-1 focus:ring-4 focus:outline-none focus:ring-orange-600"
              placeholder="Passowrd"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-orange-600 rounded p-2 w-24 m-auto"
          >
            Sign In
          </button>
        </form>
        <a
          href="/forgot-password"
          className="text-white hover:text-orange-600  p-4"
        >
          Glemt passord?
        </a>
      </div>
      <Toaster />
    </div>
  );
};

export default page;

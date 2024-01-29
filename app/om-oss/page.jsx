"use client";

import React from "react";
import bgImage from "../../public/images/bgImage_03.jpg";
import Image from "next/image";
import styles from "./styles.module.css";
import img from "../../public/images/img_3.webp";
import imgTwo from "../../public/images/img_4.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const page = () => {
  return (
    <div className={styles.body}>
      <div className={styles.containerOne}>
        <h2 className="p-10 text-6xl font-bold">Lorem ipsum</h2>
        <p className="px-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <div className="flex gap-10 px-20 py-20">
          <div>
            <h2 className="text-center text-orange-600 mb-2">Lorem ipsum</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div>
            <h2 className="text-center text-orange-600 mb-2 ">Lorem ipsum</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div>
            <h2 className="text-center text-orange-600 mb-2">Lorem ipsum</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

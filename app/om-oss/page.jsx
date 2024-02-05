"use client";

import { React, useEffect } from "react";
import styles from "./styles.module.css";
import bgImage from "../../public/images/bgImage_03.jpg";
import Image from "next/image";
import ContainerOne from "./ContainerOne";
import MenyLabel from "./MenyLabel";
import { motion, AnimatePresence } from "framer-motion";

const page = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <AnimatePresence>
      <div  >
        <Image src={bgImage} alt="Loading..." className={styles.bgImageLogin} />
        <ContainerOne />
        <MenyLabel />
      </div>
    </AnimatePresence>
  );
};

export default page;

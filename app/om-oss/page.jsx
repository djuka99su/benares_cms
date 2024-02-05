"use client";

import { React, useEffect } from "react";
import styles from "./styles.module.css";
import bgImage from "../../public/images/bgImage_03.jpg";
import Image from "next/image";
import ContainerOne from "./ContainerOne";
import MenyLabel from "./MenyLabel";

const page = () => {

  return (
      <div  >
        <Image src={bgImage} alt="Loading..." className={styles.bgImageLogin} />
        <ContainerOne />
        <MenyLabel />
      </div>
  );
};

export default page;

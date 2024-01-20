import React from 'react'
import bgImage from "../../public/images/bgImage_03.jpg";
import Image from "next/image";
import styles from "./styles.module.css";

const page = () => {
  return (
    <div className={styles.body}>
      <Image src={bgImage} alt="Loading..." className={styles.bgImage} />
      <div className={styles.containerOne}>a</div>
    </div>
  )
}

export default page
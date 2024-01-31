"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import img from "../public/images/img_3.webp";
import imgOne from "../public/images/img_home_page.png";
import bgImage from "../public/images/bgImage_03.jpg";
import Carousel from "../components/menyCards/Carousel";
import { useEffect, useState } from "react";

export default function Home() {


  return (
    <div className={styles.body}>
      <Image src={bgImage} alt="Loading..." className={styles.bgImage} />
      <div className={styles.home}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Benares</h1>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            Kom og opplev indisk matglede og atmosfære i vår restaurant
          </p>
        </div>
      </div>
      <div className={styles.anotherSection}>
        <div className={styles.containerOne}>
          <h2>Litt om oss</h2>
          <div className={styles.containerInfo}>
            <div className="flex flex-col justify-evenly">
              <p>
                Benares i Oslo sentrum er en ledende indisk restaurant med plass
                til 120 gjester. Vi serverer moderne nordindiske retter,
                spesialisert innen indisk Karri og Tandoor. Med et stort, åpent
                kjøkken, attraktiv atmosfære og et utvalg av vin, øl, cocktails
                og whisky, ønsker vi å gi deg en minneverdig opplevelse. Vårt
                erfarne team, med over 15 års bransjeerfaring, styrer 70
                sitteplasser i hoveddelen, en separat sal for 45 personer
                (ideell for store grupper), og 20 utendørssitteplasser om
                sommeren.
              </p>
              <div className={styles.infoHolder}>
                <a className={styles.infoLink} href="/om-oss">
                  Les mer...
                </a>
              </div>
            </div>

            <Image src={img} className={styles.image} alt="Loading..." />
          </div>
        </div>
      </div>
      <div className={styles.fourthSection}>
        <img
          src="/images/meny/img_meny.jpg"
          className={styles.fourthSectionImage}
          alt="Loading"
        />
        <div className={styles.infoContainer}>
          <h2>HØY</h2>
          <h2>KVALITET</h2>
          <h2 className="text-orange-600">INDISK MAT</h2>
          <p>VÅR HJEMMELAGET SAUS</p>
          <span>
            Benares har en meny som består av tradisjonelle mat teknikk fra det
            indiske kjøkken med lokale produkter av høy kvalitet. Benares ligger
            i sentrum av Oslo ved rådhuset, som av noen anses å være en av de
            beste stedene.
          </span>
          <a href="/meny">VÅR MENY</a>
        </div>
      </div>
      <div className={styles.thirdSection}>
        <div className={styles.carouselContainer}>
          <a href="/meny" className={styles.infoLinkMeny}>
            Se alle retter
          </a>
          <h3 className="text-white text-6xl  mb-16 mt-2 ml-20 ">
            Våre retter
          </h3>

          <Carousel />
        </div>
      </div>
      {/* <div className={styles.fifthSection}>
        <div className={styles.fifthSectionCOntainer}>
          <button>LOYALTY</button>
        </div>
      </div> */}
    </div>
  );
}

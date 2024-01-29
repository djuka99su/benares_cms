"use client";

import { React, useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import RemoveBtn from "./RemoveBtn";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../app/firebase";
import { onAuthStateChanged } from "firebase/auth";

const getItems = () => {
  return fetch("http://localhost:3000/api/categories/items", {
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

const Carousel = () => {
  const [index, setIndex] = useState(1);
  const [items, setItems] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    getItems().then((data) => setItems(data.items));
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const handleEdit = (e) => {
    console.log(e);
  };

  return (
    <>
      <Swiper
        grabCursor={true}
        breakpoints={{
          750: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          1078: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          1469: {
            slidesPerView: 4,
            spaceBetween: -30,
          },
          1900: {
            slidesPerView: 5,
            spaceBetween: -30,
          },
        }}
      >
        {items.map(
          (dish, i) =>
             (
              <SwiperSlide key={i}>
                  <img
                    className={styles.slideImage}
                    src={`https://dishes-b-bucket.s3.eu-north-1.amazonaws.com/${dish.title.replace(
                      " ",
                      "+"
                    )}.jpg`}
                    width={400}
                    height={600}
                    alt="Loading..."
                  />
                <div className={styles.slide}>
                  <h3>{dish.title}</h3>
                  <p className="text-white">{dish.description}</p>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
};

export default Carousel;

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

const Carousel = ({
  category
}) => {
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

    return () => {listen();}
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    window.location.reload();
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
            dish.category === category.title && (
              <SwiperSlide key={i}>
                <div className={styles.slide}>
                  <Image
                    src={`/images/meny/img_${"0"}.webp`}
                    width={400}
                    height={600}
                    alt="Loading..."
                  />
                  <h3>{dish.title}</h3>
                  <div className={styles.descrContainer}>
                    <p>{dish.description}</p>
                    <div className={styles.spanContainer}>
                      <span>{dish.price} NOK</span>
                      {authUser && (
                        <button
                          onClick={handleEdit}
                          className="bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-sm px-4"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      )}
                      {authUser && <RemoveBtn id={dish._id} />}

                      <span>{dish.allergens}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
};

export default Carousel;

"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Carousel from "../../components/menyCards/Carousel";
import Image from "next/image";
import bgImage from "../../public/images/bgImage_03.jpg";

const getCategories = () => {
  return fetch("http://localhost:3000/api/categories", {
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

const page = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);



  useEffect(() => {
    getCategories().then((data) => setCategories(data.categories));
  }, []);

  const closeModal = () => {
    setModal(false);
    setEdit(false);
  };

  const openModal = () => {
    setModal(true);
    setEdit(true);
  };

  return (
    <div className={styles.body}>
      <Image src={bgImage} alt="Loading..." className={styles.bgImage}/>
      {categories.map((category, index) => (
        <div className={index==0 ? styles.containerFirst :styles.container} key={index}>
          <h2>{category.title }</h2>
          <Carousel
            modal={modal}
            editState={edit}
            openModal={openModal}
            closeModal={closeModal}
            category={category}
            categories={categories}
          />
        </div>
      ))}
    </div>
  );
};

export default page;

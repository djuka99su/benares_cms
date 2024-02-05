"use client";

import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faXmark,
  faBowlFood,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getCategories, getItems } from "../functions";
import ModalItem from "../../components/menyCards/ModalItem";
import ModalCategory from "../../components/menyCards/ModalCategory";
import RemoveBtn from "../../components/menyCards/RemoveBtn";
import RemoveBtnCategory from "../../components/menyCards/RemoveBtnCategory";
import ModalEditItem from "../../components/menyCards/ModalEditItem";
import ModalEditCategory from "../../components/menyCards/ModalEditCategory";
import bgImage from "../../public/images/imgTwo_home.jpg";
import Image from "next/image";




const Meny = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageOverlay, setImageOverlay] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [size, setSize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalItem, setModalItem] = useState(false);
  const [modalCatergoy, setModalCategory] = useState(false);

  const [modalItemEdit, setModalItemEdit] = useState(false);
  const [dishID, setDishID] = useState("");
  const [dishTitle, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [defCategory, setCategory] = useState("");
  const [allergens, setAllergens] = useState("");

  const [modalCatergoyEdit, setModalCategoryEdit] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");

  const [authUser, setAuthUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const [buttonHover, setButtonHover] = useState(false);

  useEffect(() => {
    const windowSize = window.innerWidth / window.innerHeight;
    if (windowSize >= 2) {
      setSize(true);
    }

    getItems().then((data) => {
      if (data) {
        setItems(data.items);
      }
    });
    getCategories().then((dataTwo) => {
      if (dataTwo) {setCategories(dataTwo.categories)};
    });
    setLoading(true);
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      }
      if (user && user.uid === "TZI1RfVklBWJXjCPFMOcjfbrZxv1") {
        setAdmin(true);
      }
    });

    return () => {
      listen();
    };
  }, []);



  const handleImageClick = (e) => {
    setImageOverlay(true);
    setImageUrl(e.target.src);
  };

  const handleClose = () => {
    setModalItem(false);
    setModalCategory(false);
    setModalItemEdit(false);
    setModalCategoryEdit(false);
  };

  const handleOverlayClose = (e) => {
    if (e.target.name !== "image") {
      setImageOverlay(false);
    }
  };

  const handleEditItem = (
    dishName,
    dishPrice,
    dishDescr,
    dishCategory,
    dishAllergens,
    ID
  ) => {
    setTitle(dishName);
    setPrice(dishPrice);
    setDescr(dishDescr);
    setCategory(dishCategory);
    setAllergens(dishAllergens);
    setDishID(ID);
    setModalItemEdit(true);
  };

  const handleEditCategory = (categoryTitle, id) => {
    setCategoryID(id);
    setCategoryTitle(categoryTitle);
    setModalCategoryEdit(true);
  };

  return (
    <div className="min-h-screen">
      <Image src={bgImage} alt="Loading..." className={styles.bgImage} />
      {!loading ? (
        <div className="text-white absolute top-1/2 left-1/2">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      ) : (
        categories.map((category, ic) => (
          <div
            key={ic}
            className={ic === 0 ? styles.container : ic=== 1 ? styles.containerTwo : styles.containerThree}
          >
            <div className="flex gap-2 flex-col md:flex-row">
              <h2 className="p-4 my-4 md:my-0 text-4xl md:text-6xl text-center md:text-left">
                {category.title}
              </h2>
              {authUser && admin && (
                <div className="flex gap-2 justify-center">
                  <button
                    className="text-2xl"
                    onClick={() =>
                      handleEditCategory(category.title, category._id)
                    }
                  >
                    <FontAwesomeIcon
                      className="text-orange-600 transition-transform duration-200 ease-in-out hover:scale-110"
                      icon={faPenToSquare}
                    />
                  </button>
                  <RemoveBtnCategory id={category._id} />
                </div>
              )}
            </div>
            <div className="p-1 md:p-6 flex gap-4 md:gap-0 justify-center flex-wrap md:flex-col">
              {items.map(
                (item, ii) =>
                  item.category === category.title && (
                    <div
                      key={ii}
                      className={`flex w-44 md:w-full flex-col md:flex-row justify-between ${
                        ii !== items.length - 1 &&
                        "border-b-2 border-slate-600 mb-6"
                      } pb-6`}
                    >
                      <div className="flex flex-col md:flex-row">
                        <img
                          onClick={handleImageClick}
                          className={`w-full h-36 md:w-48 md:h-32 m-auto md:mx-4 rounded w ${
                            size
                              ? "cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
                              : undefined
                          }`}
                          src={`https://dishes-b-bucket.s3.eu-north-1.amazonaws.com/${item.title.replace(
                            " ",
                            "+"
                          )}.jpg`}
                          alt="Loading..."
                        />
                        <div className="flex flex-col text-center md:text-left justify-between">
                          <h3 className="text-orange-600 text-md font-bold my-2 md:my-0 md:text-2xl">
                            {item.title}
                          </h3>
                          <div className="flex m-auto md:m-0 justify-between g-10">
                            <p className="md:w-56 lg:w-96 text-sm md:text-md my-2 md:my-0">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col text-center md:text-left justify-center md:justify-end w-full md:w-36 mr-4 my-2 md:my-0">
                        <p className="font-bold underline w-48">
                          {item.price} NOK
                        </p>
                        <p className="w-64">({item.allergens})</p>
                      </div>
                      {authUser && admin && (
                        <div className="flex flex-row md:flex-col gap-2 justify-center px-10 mt-2 md:mt-0">
                          <button
                            className="text-2xl"
                            onClick={() =>
                              handleEditItem(
                                item.title,
                                item.price,
                                item.description,
                                category.title,
                                item.allergens,
                                item._id
                              )
                            }
                          >
                            <FontAwesomeIcon
                              className="text-orange-600 transition-transform duration-200 ease-in-out hover:scale-110"
                              icon={faPenToSquare}
                            />
                          </button>
                          <RemoveBtn role={"item"} id={item._id} />
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        ))
      )}
      {authUser && admin && (
        <div
          onMouseOver={() => setButtonHover(true)}
          onMouseOut={() => setButtonHover(false)}
          className="text-white fixed flex flex-col gap-2 bottom-4 right-4 sm:right-4 text-md transition-transform duration-200 ease-in-out"
        >
          {buttonHover && (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setModalCategory(true)}
                className="bg-orange-600 rounded w-10 m-auto px-2 py-1 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              <button
                onClick={() => setModalItem(true)}
                className="bg-orange-600 rounded w-10 m-auto px-2 py-1 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
              >
                <FontAwesomeIcon icon={faBowlFood} />
              </button>
            </div>
          )}
          <div className="bg-orange-600 rounded m-auto px-2 py-1 cursor-pointer w-10 text-center transition-transform duration-200 ease-in-out hover:scale-110">
            +
          </div>
        </div>
      )}

      <div
        className={`w-screen ${
          !imageOverlay && "hidden"
        } h-screen bg-black bg-opacity-70 fixed top-0 z-30 flex justify-center items-center`}
        onClick={handleOverlayClose}
      >
        <div className="w-full h-2/5 md:w-3/5 md:h-4/5 text-right mb-8 rounded">
          <button
            onClick={() => setImageOverlay(false)}
            className="text-white m-right font-bold text-4xl relative top-12  rounded right-4  z-10 transition-transform duration-200 ease-in-out hover:scale-110"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <img
            name="image"
            src={imageUrl}
            className="w-full h-full rounded"
            alt="Loading image..."
          />
        </div>
      </div>
      {authUser && admin && (
        <div>
          <ModalItem
            modal={modalItem}
            closeModal={handleClose}
            categories={categories}
          />
          <ModalEditItem
            modal={modalItemEdit}
            closeModal={handleClose}
            categories={categories}
            defName={dishTitle}
            defPrice={price}
            defDescr={descr}
            defCategory={defCategory}
            defAllergens={allergens}
            id={dishID}
          />

          <ModalCategory modal={modalCatergoy} closeModal={handleClose} />
          <ModalEditCategory
            modal={modalCatergoyEdit}
            closeModal={handleClose}
            categoryTitle={categoryTitle}
            id={categoryID}
          />
        </div>
      )}
    </div>
  );
};

export default Meny;

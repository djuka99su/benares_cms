"use client";

import { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const ModalEditItem = ({ modal, closeModal, categories, defName, defPrice, defDescr, defCategory, defAllergens, id }) => {


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [categoryState, setCategory] = useState("");
  const [allergensState, setAllergensState] = useState("");
  const [imageEdit, setImageEdit] = useState(null);
  const [imageNameEdit, setImageNameEdit] = useState("");
  const [button, setButton] = useState(true);
  const [ID, setID] = useState("")


  useEffect(() => {
    setName(defName)
    setPrice(defPrice)
    setDescr(defDescr)
    setCategory(defCategory)
    setAllergensState(defAllergens)
    setID(id)
  }, [defName])


  const handleClose = () => {
    closeModal();
  };


  const handleImageChange = (e) => {
    setImageEdit(e.target.files[0]);
    setImageNameEdit(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageEdit) return;
    const formData = new FormData();
    formData.append("image", imageEdit);

    try {
      const response = await fetch("http://localhost:3000/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data.status);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await fetch(`http://localhost:3000/api/categories/items/${ID}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        }, 

        body: JSON.stringify({
          newTitle: name,
          newPrice: price,
          newCategory: categoryState,
          newAllergens: allergensState,
          newDescription: descr,
        }),

      });

      if (res.ok) {
        handleClose();
        window.location.reload();
      } else {
        throw new Error("Faild to edit Item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {modal && (
        <div
          className="fixed inset-0 bg-black opacity-90 z-40"
          onClick={handleClose}
        ></div>
      )}

      <div>
        {/* Main modal */}
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={`${
            !modal && "hidden"
          } flex  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="absolute p-4 w-full max-w-lg max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {"Edit Product"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                  onClick={handleClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Navn
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={ "Type product name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="allergens"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Allergens
                    </label>
                    <input
                      type="text"
                      name="allergens"
                      id="allergens"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={"Allergens"}
                      value={allergensState}
                      onChange={(e) => setAllergensState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Price in NOK"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  {
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={categoryState}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="" disabled hidden>
                          Select Category
                        </option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.title}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  }
                  <div className="col-span-2 mt-2 text-center">
                    <label
                      htmlFor="imageEdit"
                      className=" w-28  bg-orange-600 p-2 rounded   text-sm font-medium cursor-pointer  text-white"
                    >
                      Upload image{" "}
                      <FontAwesomeIcon className="h-4" icon={faCloudArrowUp} />
                    </label>
                    <input
                      className="sr-only"
                      onChange={handleImageChange}
                      id="imageEdit"
                      name="imageEdit"
                      type="file"
                      accept="imageEdit/*"
                    />
                    
                    <span className="ml-2 text-gray-500 mt-2 mr-1 block">
                      {imageNameEdit
                        ? imageNameEdit.replace("C:\\fakepath\\", "")
                        : "No file chosen"}
                    </span>
                    <span className="ml-2 text-red-500 mt-2 mr-1 block">
                      Bildenavn må være samme som navn til matretten
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      maxLength="120"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={descr}
                      placeholder="Description, max 120 char"
                      onChange={(e) => setDescr(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {(
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  {"Edit product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditItem;

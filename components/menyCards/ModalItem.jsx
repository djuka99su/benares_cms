"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";

const ModalItem = ({ modal, closeModal, categories }) => {
  const router = useRouter();

  const [createName, setCreateName] = useState("");
  const [createPrice, setCreatePrice] = useState("");
  const [createDescr, setCreateDescr] = useState("");
  const [categoryState, setCategory] = useState("");
  const [allergensState, setAllergensState] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("Ingen opplastet bilde");
  const [imgNameEql, setImgNameEql] = useState(false);
  const [button, setButton] = useState(false);

  const handleClose = () => {
    closeModal();
    setCreateName("");
    setCreatePrice("");
    setCreateDescr("");
    setCategory("");
    setAllergensState("");
    setImage(null);
    setImageName("Ingen opplastet bilde");
    setImgNameEql(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.value);
  };

  useEffect(() => {
    if (
      createName === imageName.replace("C:\\fakepath\\", "").replace(".jpg", "")
    ) {
      setImgNameEql(true);
    }
  }, [imageName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgNameEql) {
      toast.error(
        "Bildenavn og navn til matretten er ikke likt. Dette må fikses!"
      );
      return;
    }

    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

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
      const res = await fetch("/api/categories/items", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: createName,
          price: createPrice,
          category: categoryState,
          allergens: allergensState,
          description: createDescr,
        }),
      });

      if (res.ok) {
        handleClose();
        window.location.reload();
      } else {
        throw new Error("Faild to create a category");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
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
                  {"Opprett ny element"}
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
                      placeholder={"Skriv inn elementnavn"}
                      value={createName}
                      onChange={(e) => setCreateName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="allergens"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Allergener
                    </label>
                    <input
                      type="text"
                      name="allergens"
                      id="allergens"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={"Allergener"}
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
                      Pris
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Pris i NOK"
                      value={createPrice}
                      onChange={(e) => setCreatePrice(e.target.value)}
                      required
                    />
                  </div>
                  {
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Kategori
                      </label>
                      <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={categoryState}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="" disabled hidden>
                          Velg kategori
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
                      htmlFor="image"
                      className=" w-28  bg-orange-600 p-2 rounded   text-sm font-medium cursor-pointer  text-white"
                    >
                      Last opp bilde{" "}
                      <FontAwesomeIcon className="h-4" icon={faCloudArrowUp} />
                    </label>
                    <input
                      className="sr-only"
                      onChange={handleImageChange}
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                    />
                    <span className="ml-2 text-gray-500 mt-2 mr-1 block">
                      {imageName && imageName.replace("C:\\fakepath\\", "")}
                    </span>
                    <span
                      className={`ml-2 ${
                        imgNameEql ? "text-green-500" : " text-red-500"
                      } mt-2 mr-1 block`}
                    >
                      {imgNameEql
                        ? "Bildenavn og navn på retten er det samme"
                        : "Bildenavn må være samme som navn til matretten"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Beskrivelse
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      maxLength="120"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={createDescr}
                      placeholder="Beskrivelse, max 120 char"
                      onChange={(e) => setCreateDescr(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  disabled={button}
                  type="submit"
                  className="text-white inline-flex items-center bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {
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
                  }

                  {"Opprett ny element"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalItem;

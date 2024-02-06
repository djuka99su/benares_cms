"use client";
import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css"

const DropdownSection = () => {
  const [showBtnOne, setShowBtnOne] = useState(false);
  const [showBtnTwo, setShowBtnTwo] = useState(false);
  const [showBtnThree, setShowBtnThree] = useState(false);

  const handleShowButtonOne = () => {
    if (!showBtnOne) {
      setShowBtnOne(true);
    } else {
      setShowBtnOne(false);
    }
  };
  const handleShowButtonTwo = () => {
    if (!showBtnTwo) {
      setShowBtnTwo(true);
    } else {
      setShowBtnTwo(false);
    }
  };
  const handleShowButtonThree = () => {
    if (!showBtnThree) {
      setShowBtnThree(true);
    } else {
      setShowBtnThree(false);
    }
  };
  return (
    <div>
      <div className={`flex gap-10 p-10 sm:p-20 flex-col sm:flex-row`}>
        <div className="flex-1">
          <h2
            className="text-center text-orange-600 mb-2 flex gap-2 justify-center items-center"
            onClick={handleShowButtonOne}
          >
            2019
            <FontAwesomeIcon
              className={`w-4 cursor-pointer ${
                showBtnOne && "rotate-180"
              }  block sm:hidden transition-transform duration-200 ease-in-out hover:scale-110`}
              icon={faChevronDown}
            />{" "}
          </h2>
          <p className={`${showBtnOne ? "block" : "hidden"} sm:block text-center `}>
            Et år med blomstrende vekst for indiske restauranter i India, drevet
            av økende interesse og etterspørsel etter autentisk indisk mat.
            Lokale kulinariske opplevelser ble stadig mer populære, og bransjen
            opplevde en positiv trend.
          </p>
        </div>
        <div className="flex-1">
          <h2
            className={`text-center text-orange-600 mb-2 flex gap-2 justify-center items-center`}
            onClick={handleShowButtonTwo}
          >
            2020{" "}
            <FontAwesomeIcon
              className={`w-4 cursor-pointer  ${
                showBtnTwo && "rotate-180"
              } block sm:hidden transition-transform duration-200 ease-in-out hover:scale-110`}
              icon={faChevronDown}
            />{" "}
          </h2>
          <p className={`${showBtnTwo ? "block" : "hidden"} sm:block text-center `}>
            I 2020 ble imidlertid veksten utfordret av den globale pandemien.
            Restriksjoner og nedstengninger påvirket restaurantvirksomheten, men
            mange tilpasset seg ved å tilby takeout og leveringstjenester for å
            møte kundenes behov under vanskelige forhold.
          </p>
        </div>
        <div className="flex-1">
          <h2
            className="text-center text-orange-600 mb-2 flex gap-2 justify-center items-center"
            onClick={handleShowButtonThree}
          >
            2021{" "}
            <FontAwesomeIcon
              className={`w-4 cursor-pointer ${
                showBtnThree && "rotate-180"
              } block sm:hidden transition-transform duration-200 ease-in-out hover:scale-110`}
              icon={faChevronDown}
            />{" "}
          </h2>
          <p className={`${showBtnThree ? "block" : "hidden"} sm:block text-center`}>
            Året 2021 markerte en oppadgående trend for indiske restauranter.
            Med gradvis lettelser i restriksjoner og en økende tillit til å
            spise ute, opplevde bransjen en revitalisering. Innovasjon i
            menytilbud og en fornyet entusiasme fra kunder bidro til en
            gjenopptakelse av vekst, og indiske restauranter fortsatte å trives
            i møte med utfordringene fra året før.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropdownSection;

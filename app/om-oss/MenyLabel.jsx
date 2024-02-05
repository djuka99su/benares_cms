import React from "react";
import Image from "next/image";
import imageDish from "../../public/images/dishPhoto.png";
import imageDishTwo from "../../public/images/dishTwoPhoto.png";
import imageDishThree from "../../public/images/dishThreePhoto.png";
import { motion } from "framer-motion";

const MenyLabel = () => {
  return (
    <motion.div
      className="flex justify-center  m-auto flex-col items-center mt-48 p-10  gap-4  mb-16 w-screen sm:w-3/5 h-2/5 shadow-slate-950 shadow-md"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.50 }}
    >
      <div className="flex justify-evenly gap-4 w-full items-center">
        <Image
          src={imageDish}
          className="animate-spin-slow w-24 lg:w-64 outline-none"
          alt="Loading..."
        />
        <Image
          src={imageDishTwo}
          className="animate-spin-slow w-24 lg:w-64 outline-none"
          alt="Loading..."
        />
        <Image
          src={imageDishThree}
          className="animate-spin-slow w-24 lg:w-64 outline-none"
          alt="Loading..."
        />
      </div>
      <h2 className="text-5xl sm:text-7xl font-bold text-slate-950">
        Tradisjon...
      </h2>
      <p className="text-center text-xl mt-5 text-orange-600 overflow-auto h-60 sm:h-auto">
        Benares har en meny som består av tradisjonelle mat teknikk fra det
        indiske kjøkken med lokale produkter av høy kvalitet. Benares ligger i
        sentrum av Oslo ved rådhuset, som av noen anses å være en av de beste
        stedene.
      </p>
      <a
        href="/meny"
        className="p-2 bg-slate-950 px-6 text-white rounded transition-transform duration-200 ease-in-out hover:scale-110"
      >
        Finn ut
      </a>
    </motion.div>
  );
};

export default MenyLabel;

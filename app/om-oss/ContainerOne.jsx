"use client";

import { React } from "react";
import styles from "./styles.module.css";
import DropdownSeciton from "./DropdownSection";
import { motion } from "framer-motion";

const ContainerOne = () => {

  return (
    <motion.div
      className={styles.containerOne}

      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.25 }}
    >
      <h2 className="p-10 text-3xl sm:text-6xl font-bold">Vår restaurant</h2>
      <p className="px-10 overflow-auto h-60 sm:h-auto">
        Benares i Oslo sentrum er en ledende indisk restaurant med plass til 120
        gjester. Vi serverer moderne nordindiske retter, spesialisert innen
        indisk Karri og Tandoor. Med et stort, åpent kjøkken, attraktiv
        atmosfære og et utvalg av vin, øl, cocktails og whisky, ønsker vi å gi
        deg en minneverdig opplevelse. Vårt erfarne team, med over 15 års
        bransjeerfaring, styrer 70 sitteplasser i hoveddelen, en separat sal for
        45 personer (ideell for store grupper), og 20 utendørssitteplasser om
        sommeren.
      </p>
      <DropdownSeciton />
    </motion.div>
  );
};

export default ContainerOne;

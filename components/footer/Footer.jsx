import React from "react";
import styles from "./styles.module.css";

const links = [
  { name: "Forside", href: "/", target: "_self" },
  { name: "Meny", href: "/meny", target: "_self" },
  { name: "Om oss", href: "/om-oss", target: "_self" },
  { name: "Levering", href: "/levering", target: "_self" },
  {
    name: "Book Table",
    href: "/https://book.easytablebooking.com/book/?id=ac795&lang=no&_gl=1*10n2e8o*_gcl_aw*R0NMLjE3MDIyMDMyNjcuQ2owS0NRaUE0TldyQmhELUFSSXNBRkNLd1d1OHNtX2JseGVBMFRoUTNmbkFGcUdKX29FRGN4LVVlMDN5VzNjYzJKR0tXX1hnR2xnWFBEd2FBc0lrRUFMd193Y0I.*_gcl_au*NTM5NDg3MjY0LjE2OTkwMzU3OTY.&_ga=2.56697826.934400267.1702124835-750787018.1699035797&_gac=1.195582558.1702203268.Cj0KCQiA4NWrBhD-ARIsAFCKwWu8sm_blxeA0ThQ3fnAFqGJ_oEDcx-Ue03yW3cc2JGKW_XgGlgXPDwaAsIkEALw_wcB",
    target: "_blank",
  },
];

const Footer = () => {


  return (
    <div className={styles.body}>
      <div className={styles.borderTextContainer}>
        <ul className={styles.items}>
          {links.map((link, i) => (
            <li key={i}>
              <a className="hover:text-orange-600" href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
        <div className={styles.footerInfo}>
          <p className={styles.footerParagraph}>
            Copyright DNDev All Right Reserved.
          </p>
          <div className={styles.footerLinks}>
            <a className={styles.footerLink} href="#">Bestill mat</a>
            <a className={styles.footerLink} href="#">Reserver</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

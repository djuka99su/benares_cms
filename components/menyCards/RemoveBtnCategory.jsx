import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const RemoveBtnCategory = ({ id }) => {
  const handleRemove = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `/api/categories?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("Res ok");
        window.location.reload();
      }
    }
  };

  return (
      <button
        onClick={handleRemove}
        className="text-red-600 transition-transform text-2xl duration-200 ease-in-out hover:scale-110"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
  );
};

export default RemoveBtnCategory;

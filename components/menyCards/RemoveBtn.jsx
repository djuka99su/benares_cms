import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const handleRemove = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `http://localhost:3000/api/categories/items?id=${id}`,
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
    <div>
      <button
        onClick={handleRemove}
        className="bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-sm px-4"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default RemoveBtn;

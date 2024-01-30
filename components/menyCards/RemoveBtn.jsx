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
        `/api/categories/items?id=${id}`,
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
        className="text-red-600 transition-transform text-2xl duration-200 ease-in-out hover:scale-110"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default RemoveBtn;

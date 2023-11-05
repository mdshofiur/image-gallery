import { useProductContext } from "@/context/product-provider";
import React from "react";

export const HeaderContents = () => {
  const { handleDeleteSelected, selectedCheckboxes } = useProductContext();
  return (
    <section className="flex items-center justify-between pb-10">
      <h3 className="text-xl md:text-2xl font-bold capitalize">
        {selectedCheckboxes.length > 0
          ? `${selectedCheckboxes.length} Files Selected`
          : "Gallery"}
      </h3>
      <button
        className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-opacity-60 transition-all"
        onClick={handleDeleteSelected}
      >
        Delete files
      </button>
    </section>
  );
};


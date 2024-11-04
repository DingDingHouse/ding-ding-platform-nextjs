import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <Image
      src="/loader.gif"
      height={300}
      width={300}
      alt="Loading animation"
      className="w-[15vh] h-[15vh] sm:w-[15vw] sm:h-[15vw]"
      unoptimized
    />
  );
};

export default Loader;

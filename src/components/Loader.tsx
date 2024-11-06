import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <Image
      src="/loader.gif"
      height={300}
      width={300}
      alt="Loading animation"
      className="portrait:w-[15vh] portrait:h-[15vh] landscape:w-[15vw] landscape:h-[15vw]"
      unoptimized
    />
  );
};

export default Loader;

import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <Image
      src="/loader.gif"
      height={500}
      width={500}
      alt="Loading animation"
      unoptimized
    />
  );
};

export default Loader;

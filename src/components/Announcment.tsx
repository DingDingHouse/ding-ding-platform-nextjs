import React, { useState } from "react";

const Announcment = () => {
  const tabs = ["Announcement", "Game Management"];
  const [selected, setSelected] = useState(tabs[0]);
  return (
    <div className="w-full flex flex-col gap-3vw items-center">
      <div className="flex justify-center gap-0-5vw">
        {tabs.map((item, index) => (
          <button
            onClick={() => {
              setSelected(item);
            }}
            key={index}
            className="bg-gradient-to-b from-[#FF8700] to-[#F2D25B] rounded-2xl flex w-[45%] items-stretch justify-center p-0-12vw"
          >
            <div className="bg-gradient-to-b from-[#6D3904] to-[#FD9303] rounded-2xl p-0-5vw gap-0-5vw w-full items-center justify-center flex">
              <p
                className={`text-1-5vw stroke-white text-wrap font-[600] text-center transition-all duration-500 ${
                  selected === item
                    ? "bg-gradient-to-b bg-clip-text text-transparent from-[#C79F28] via-[#FFE650] to-[#FFE650]"
                    : "stroke"
                }`}
              >
                {item}
              </p>
            </div>
          </button>
        ))}
      </div>
      <div className="w-[80%] bg-gradient-to-b from-[#000000] to-[#933710] rounded-2xl p-0-12vw h-[8vh] sm:h-[8vw] overflow-hidden">
        <div className="h-full hideScrollBar overflow-y-auto bg-gradient-to-b from-[#FFB90180] to-[#FA800180] rounded-2xl p-0-3vw">
          <p className="p-0-3vw font-[400] text-[1vh] sm:text-[1vw]">
            Nothing to show here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcment;

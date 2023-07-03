import React from "react";
import { FunctionComponent, useCallback } from "react";

const FiltersButton: FunctionComponent = () => {
  const onFrameContainer3Click = useCallback(() => {
    // Please sync "Filters" to the project
  }, []);

  return (
    <div
      className="self-stretch rounded-2xl bg-blueviolet shadow-[0px_2px_4px_rgba(0,_0,_0,_0.25),_0px_6px_12px_rgba(137,_81,_255,_0.5)]  flex flex-row py-[0.5rem] px-[1.13rem] items-center justify-between cursor-pointer text-left text-[1.13rem] text-gray font-quicksand border-[3px] border-solid border-telegram"
      onClick={onFrameContainer3Click}
    >
      <div className="relative tracking-[-0.03em] leading-[1.25rem] font-medium inline-block w-[2.5rem] shrink-0">
        QUA
      </div>
      <div className="flex flex-col items-center justify-start text-[1rem] text-text-white font-sf-pro-text">
        <div className="relative tracking-[-0.03em] leading-[1.25rem] font-medium">
          All beauty services
        </div>
        <div className="flex flex-row items-end justify-start gap-[0.5rem] text-[0.81rem]">
          <div className="relative tracking-[-0.03em] leading-[1.25rem] font-medium opacity-[0.72]">
            Around 10km
          </div>
          <div className="relative text-[0.56rem] tracking-[-0.03em] leading-[1rem] font-medium font-sf-pro-display opacity-[0.72]">
            ○
          </div>
          <div className="relative tracking-[-0.03em] leading-[1.25rem] font-medium opacity-[0.72]">
            Any price
          </div>
        </div>
      </div>
      <div className="w-[2.5rem] flex flex-row items-center justify-end">
        <img
          className="relative w-[1.25rem] h-[1.25rem] overflow-hidden shrink-0 opacity-[0.72]"
          alt=""
          src="/tune-fill0-wght400-grad0-opsz48-1.svg"
        />
      </div>
    </div>
  );
};

export default FiltersButton;

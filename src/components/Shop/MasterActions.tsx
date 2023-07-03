import React, { FunctionComponent } from "react";

const MasterActions: FunctionComponent = () => {
  return (
    <div className="rounded-xl bg-brand-purple w-[22.38rem] flex flex-row py-[0.5rem] px-[1rem] box-border items-center justify-between z-[1] text-left text-[0.75rem] text-black font-sf-pro-text">
      <div className="flex flex-row items-start justify-start gap-[0.5rem]">
        <img
          className="relative w-[3rem] h-[3rem]"
          alt=""
          src="/group-286.svg"
        />
        <img
          className="relative w-[3rem] h-[3rem]"
          alt=""
          src="/group-2861.svg"
        />
      </div>
      <div className="relative box-border w-[0.13rem] h-[2.44rem] border-r-[1px] border-solid border-gray-300" />
      <div className="flex flex-col items-start justify-start gap-[0.38rem]">
        <div className="relative tracking-[-0.02em] font-medium">
          Liked by 16 users
        </div>
        <img
          className="relative w-[5rem] h-[2rem] object-cover"
          alt=""
          src="/group-56@2x.png"
        />
      </div>
      <div className="relative box-border w-[0.13rem] h-[2.44rem] border-r-[1px] border-solid border-gray-300" />
      <div className="flex flex-col items-start justify-start gap-[0.38rem]">
        <div className="relative tracking-[-0.02em] font-medium">2 reviews</div>
        <div className="relative w-[3.46rem] h-[2rem] text-[1.5rem] font-sf-pro-display">
          <div className="absolute top-[0rem] left-[1.46rem] w-[2rem] h-[2rem]">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-brand-lime" />
            <div className="absolute top-[0.19rem] left-[0.25rem] tracking-[-0.02em] font-medium inline-block w-[1rem] h-[1rem]">
              👍
            </div>
          </div>
          <div className="absolute top-[0rem] left-[0rem] w-[2rem] h-[2rem]">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[50%] bg-thistle" />
            <div className="absolute top-[0.25rem] left-[0.25rem] tracking-[-0.02em] font-medium inline-block w-[1rem] h-[1rem]">
              😍
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterActions;

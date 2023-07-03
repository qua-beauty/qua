import { FunctionComponent } from "react";
import Story from "./Story";

const Stories: FunctionComponent = () => {
  return (
    <div className="flex flex-row items-start justify-start gap-[1rem] text-left text-[0.81rem] text-black font-sf-pro-text">
      <div className="flex flex-col items-center justify-start gap-[0.25rem]">
        <img
          className="relative rounded-13xl w-[4.13rem] h-[4.13rem] overflow-hidden shrink-0"
          alt=""
          src="/frame-65.svg"
        />
        <div className="relative tracking-[-0.02em] font-medium">life</div>
      </div>
      <Story />
      <div className="flex flex-col items-center justify-start gap-[0.25rem]">
        <div className="relative rounded-13xl box-border w-[4.13rem] h-[4.13rem] overflow-hidden shrink-0 border-[1px] border-solid border-telegram" />
        <div className="relative tracking-[-0.02em] font-medium">discounts</div>
      </div>
      <div className="flex flex-col items-center justify-start gap-[0.25rem]">
        <img
          className="relative rounded-13xl w-[4.13rem] h-[4.13rem] overflow-hidden shrink-0"
          alt=""
          src="/frame-65.svg"
        />
        <div className="relative tracking-[-0.02em] font-medium">reviews</div>
      </div>
      <div className="flex flex-col items-center justify-start gap-[0.25rem]">
        <img
          className="relative rounded-13xl w-[4rem] h-[4.13rem] overflow-hidden shrink-0"
          alt=""
          src="/frame-65.svg"
        />
        <div className="relative tracking-[-0.02em] font-medium">blog</div>
      </div>
    </div>
  );
};

export default Stories;

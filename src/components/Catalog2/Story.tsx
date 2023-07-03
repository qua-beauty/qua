import { FunctionComponent } from "react";

const Story: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-[0.25rem] text-center text-[0.81rem] text-black font-sf-pro-text">
      <img
        className="relative rounded-13xl w-[4.13rem] h-[4.13rem] overflow-hidden shrink-0"
        alt=""
        src="/frame-65.svg"
      />
      <div className="relative tracking-[-0.02em] font-medium">
        <p className="m-0">{`new `}</p>
        <p className="m-0">masters</p>
      </div>
    </div>
  );
};

export default Story;

import React, { FunctionComponent } from "react";

const Schedule: FunctionComponent = () => {
  return (
    <div className="relative w-[19.38rem] h-[18rem] text-left text-[1.25rem] text-text-primary font-sf-pro-display">
      <div className="absolute top-[0rem] left-[0rem] tracking-[-0.02em] font-medium">
        Schedule for the week
      </div>
      
      <div className="absolute top-[3rem] left-[3.06rem] flex flex-col items-start justify-start text-[0.75rem] text-telegram font-sf-pro-text">
        <div className="relative w-[16.31rem] h-[15rem]">
          <div className="absolute top-[0rem] left-[0rem] w-[12.5rem] h-[15rem] text-[0.94rem] text-black">
            <div className="absolute top-[0rem] left-[0rem] flex flex-col items-end justify-start gap-[0.75rem]">
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium text-gray-400">
                Monday
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium">
                Tuesday
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium">
                Wednesday
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium text-gray-400">
                Thursday
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium">
                Friday
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium">
                Saturday
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium">
                Sunday
              </div>
            </div>
            <div className="absolute top-[0rem] left-[6.38rem] flex flex-col items-start justify-start gap-[0.75rem]">
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium text-gray-400">
                10:00 – 22:00
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium">
                10:00 – 22:00
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium">
                10:00 – 22:00
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium text-gray-400">
                10:00 – 22:00
              </div>
              <div className="relative tracking-[-0.02em] leading-[1.5rem] font-medium">
                10:00 – 22:00
              </div>
              <i className="relative tracking-[-0.02em] leading-[1.5rem] font-medium text-text-disabled">
                No working
              </i>
              <i className="relative tracking-[-0.02em] leading-[1.5rem] font-medium text-text-disabled">
                No working
              </i>
            </div>
          </div>
          <div className="absolute top-[2.56rem] left-[13.19rem] tracking-[-0.02em] font-medium">
            Available
          </div>
          <div className="absolute top-[9.31rem] left-[13.19rem] tracking-[-0.02em] font-medium">
            Available
          </div>
          <div className="absolute top-[4.81rem] left-[13.19rem] tracking-[-0.02em] font-medium">
            Available
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

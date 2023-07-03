import React, { FunctionComponent } from "react";

const Reviews: FunctionComponent = () => {
  return (
    <div className="[background:linear-gradient(180deg,_#fff,_#eee5ff_99.99%,_#fff)] overflow-hidden flex flex-col pt-[2rem] px-[1rem] pb-[1.25rem] items-center justify-start gap-[1.5rem] text-left text-[1.25rem] text-text-primary font-sf-pro-text">
      <div className="flex flex-row items-center justify-start gap-[9.38rem] font-sf-pro-display">
        <div className="flex flex-row items-start justify-start gap-[0.5rem]">
          <div className="relative tracking-[-0.02em] font-medium">Reviews</div>
          <div className="relative w-[1.5rem] h-[1.5rem] text-[1rem] text-text-white font-sf-pro-text">
            <div className="absolute top-[0rem] left-[0rem] rounded-[50%] bg-telegram w-[1.5rem] h-[1.5rem]" />
            <div className="absolute top-[0.13rem] left-[0.44rem] tracking-[-0.02em] font-medium">
              2
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[0.25rem] text-[1rem]">
          <div className="relative tracking-[-0.02em] font-medium">
            <span>{`Sort by `}</span>
            <span className="text-telegram">Date</span>
          </div>
          <img
            className="relative w-[1.25rem] h-[1.25rem] overflow-hidden shrink-0"
            alt=""
            src="/expand-more-fill1-wght400-grad0-opsz48-11.svg"
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-[1rem] text-[0.94rem] text-telegram">
        <div className="relative w-[22.38rem] h-[7.69rem]">
          <div className="absolute top-[0rem] left-[2.38rem] w-[20rem] h-[7.69rem]">
            <img
              className="absolute h-[100.81%] w-[100.31%] top-[-0.41%] right-[-0.16%] bottom-[-0.41%] left-[-0.16%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/path.svg"
            />
            <div className="absolute w-[32.29%] top-[calc(50%_-_54.5px)] left-[6.25%] tracking-[-0.15px] font-medium inline-block">
              Katerina
            </div>
            <div className="absolute w-[89.69%] top-[calc(50%_-_34.5px)] left-[6.25%] tracking-[-0.4px] leading-[1.25rem] text-black inline-block">
              Impeccable attention to detail and a serene ambiance make this
              salon's manicure an absolute must-try.
            </div>
            <i className="absolute w-[31.25%] top-[calc(50%_+_40.5px)] left-[64.58%] text-[0.69rem] inline-block text-gray-100 text-right">
              27.05.2023 11:40
            </i>
          </div>
          <img
            className="absolute h-[26.02%] top-[72.36%] right-[20.38rem] bottom-[1.63%] max-h-full w-[2rem] object-cover"
            alt=""
            src="/group-50@2x.png"
          />
        </div>
        <div className="relative w-[22.38rem] h-[7.69rem]">
          <div className="absolute top-[0rem] left-[2.38rem] w-[20rem] h-[7.69rem]">
            <img
              className="absolute h-[100.81%] w-[100.31%] top-[-0.41%] right-[-0.16%] bottom-[-0.41%] left-[-0.16%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/path.svg"
            />
            <div className="absolute w-[32.29%] top-[calc(50%_-_54.5px)] left-[6.25%] tracking-[-0.15px] font-medium inline-block">
              Oleksandra
            </div>
            <div className="absolute w-[89.69%] top-[calc(50%_-_34.5px)] left-[6.25%] tracking-[-0.4px] leading-[1.25rem] text-black inline-block">
              The manicure I received from their expert technician left my nails
              looking flawless and me feeling truly pampered.
            </div>
            <i className="absolute w-[31.25%] top-[calc(50%_+_40.5px)] left-[64.58%] text-[0.69rem] inline-block text-gray-100 text-right">
              22.05.2023 12:10
            </i>
          </div>
          <img
            className="absolute h-[26.02%] top-[73.17%] right-[20.38rem] bottom-[0.81%] max-h-full w-[2rem] object-cover"
            alt=""
            src="/group-45@2x.png"
          />
        </div>
      </div>
      <div className="relative text-[0.88rem] tracking-[-0.03em] font-medium text-text-secondary text-center inline-block w-[10.88rem]">
        To leave a review you need to have an appointment
      </div>
    </div>
  );
};

export default Reviews;

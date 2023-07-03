import React, { FunctionComponent } from "react";

const PortfolioView = ({ portfolio, onClose }) => {
  return (
    <div className="relative rounded-3xl bg-text-white [backdrop-filter:blur(6px)] w-[22.25rem] h-[37.75rem] overflow-hidden max-w-full max-h-full text-left text-[0.88rem] text-text-primary font-sf-pro-text">
      <div className="absolute top-[0rem] left-[0rem] w-[22.25rem] h-[37.75rem] overflow-x-auto">
        <div className="absolute top-[0rem] left-[0rem] h-[30.41rem] flex flex-row items-start justify-center">
          {portfolio.map(work => (
            <div className="flex flex-col items-start justify-start">
              <img
                className="relative w-[22.31rem] h-[31.25rem] object-cover"
                alt=""
                src={work.url}
              />
              <div className="relative w-[21.88rem] h-[6.5rem] overflow-hidden shrink-0">
                <div className="absolute top-[0.75rem] left-[1rem] tracking-[-0.03em] leading-[1.13rem] inline-block w-[19.88rem]">
                  {work.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img
        className="absolute top-[15.63rem] left-[19.38rem] w-[2rem] h-[2rem] overflow-hidden"
        alt=""
        src="/arrow-forward-ios-fill1-wght300-grad0-opsz48-1.svg"
      />
      <img
        className="absolute top-[15.63rem] left-[0.5rem] w-[2rem] h-[2rem] overflow-hidden"
        alt=""
        src="/arrow-back-ios-fill1-wght300-grad0-opsz48-1.svg"
      />
      <img
        className="absolute top-[0.13rem] left-[0rem] rounded-2xl w-[3.88rem] h-[4.13rem] overflow-hidden"
        alt=""
        src="/cancel-fill1-wght300-grad0-opsz48-1-1.svg"
      />
    </div>
  );
};

export default PortfolioView;

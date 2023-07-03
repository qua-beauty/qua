import React from "react";

const MasterCardPortfolio = ({portfolio}) => {
  return portfolio && (
    <div className="self-stretch flex flex-row items-start justify-start gap-[0.5rem]">

      {portfolio.map(portfolioItem => <div className="relative rounded-lg bg-pink w-[3.75rem] h-[4.63rem] overflow-hidden shrink-0">
        <img
          className="absolute h-[106.31%] w-[103.9%] top-[0%] right-[-3.9%] bottom-[-6.31%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src={portfolioItem.url}
        />
      </div>)}
    </div>
  );
};

export default MasterCardPortfolio;

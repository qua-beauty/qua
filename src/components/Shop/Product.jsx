import React, { FunctionComponent, useMemo } from "react";

const Product = ({
  onSelect,
  height,
  cursor,
  justifyContent,
  design,
  duration,
  price,
}) => {
  const frameDivStyle = useMemo(() => ({
    height,
    cursor,
  }), [height, cursor]);

  const frameDiv1Style = useMemo(() => ({
    justifyContent,
  }), [justifyContent]);

  return (
    <div className="self-stretch rounded-2xl h-[3.38rem] flex flex-row items-center justify-between text-left text-[1.13rem] text-text-primary font-sf-pro-display"
      style={frameDivStyle}
      onClick={onSelect}
    >
      <div className="flex flex-col items-start justify-start gap-[0.25rem]" style={frameDiv1Style}>
        <div className="relative tracking-[-0.02em]">{design}</div>
        <div className="relative text-[0.94rem] tracking-[-0.03em] font-medium font-sf-pro-text text-text-secondary">
          {duration} min
        </div>
      </div>
      <div className="flex flex-row items-center justify-end text-right text-[1rem] text-text-white font-sf-pro-text">
        <div className="rounded-md bg-telegram backdrop-filter blur-[8px] h-[2rem] overflow-hidden flex flex-row py-[0.13rem] px-[0.5rem] box-border items-center justify-center">
          <div className="relative tracking-[-0.03em] font-medium">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;

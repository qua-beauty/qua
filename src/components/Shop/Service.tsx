import React, { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";

type ServiceType = {
  simpleDesign?: string;
  m?: string;
  prop?: string;

  /** Style props */
  frame44Height?: Property.Height;
  frame44Cursor?: Property.Cursor;
  frame65JustifyContent?: Property.JustifyContent;
};

const Service: FunctionComponent<ServiceType> = ({
  frame44Height,
  frame44Cursor,
  frame65JustifyContent,
  simpleDesign,
  m,
  prop,
}) => {
  const frameDivStyle: CSS.Properties = useMemo(() => {
    return {
      height: frame44Height,
      cursor: frame44Cursor,
    };
  }, [frame44Height, frame44Cursor]);

  const frameDiv1Style: CSS.Properties = useMemo(() => {
    return {
      justifyContent: frame65JustifyContent,
    };
  }, [frame65JustifyContent]);

  return (
    <div
      className="self-stretch rounded-2xl h-[3.38rem] flex flex-row items-center justify-between text-left text-[1.13rem] text-text-primary font-sf-pro-display"
      style={frameDivStyle}
    >
      <div
        className="flex flex-col items-start justify-start gap-[0.25rem]"
        style={frameDiv1Style}
      >
        <div className="relative tracking-[-0.02em]">{simpleDesign}</div>
        <div className="relative text-[0.94rem] tracking-[-0.03em] font-medium font-sf-pro-text text-text-secondary">
          {m}
        </div>
      </div>
      <div className="flex flex-row items-center justify-end text-right text-[1rem] text-text-white font-sf-pro-text">
        <div className="rounded-md bg-telegram [backdrop-filter:blur(8px)] h-[2rem] overflow-hidden flex flex-row py-[0.13rem] px-[0.5rem] box-border items-center justify-center">
          <div className="relative tracking-[-0.03em] font-medium">{prop}</div>
        </div>
      </div>
    </div>
  );
};

export default Service;

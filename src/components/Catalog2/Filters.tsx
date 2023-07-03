import { FunctionComponent } from "react";
import FiltersButton from "./FiltersButton";

const Filters: FunctionComponent = () => {
  return (
    <div className="self-stretch flex flex-col items-center justify-start gap-[1rem] text-left text-[1.13rem] text-gray font-quicksand">
      <FiltersButton />
      <div className="relative text-[0.81rem] tracking-[-0.02em] leading-[1.25rem] font-medium font-sf-pro-display text-text-secondary">{`72 masters found `}</div>
    </div>
  );
};

export default Filters;

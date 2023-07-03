import React, { FunctionComponent, useState, useCallback } from "react";
import PortalPopup from "./PortalPopup";

type ServicePopupType = {
  onClose?: () => void;
};

const ServicePopup: FunctionComponent<ServicePopupType> = ({ onClose }) => {
  const [isServicePopupOpen, setServicePopupOpen] = useState(false);

  const openServicePopup = useCallback(() => {
    setServicePopupOpen(true);
  }, []);

  const closeServicePopup = useCallback(() => {
    setServicePopupOpen(false);
  }, []);

  const onFrameContainer3Click = useCallback(() => {
    // Please sync "Booking – Set Time" to the project
  }, []);

  return (
    <>
      <div className="relative rounded-t-3xl rounded-b-none bg-text-white w-[24.38rem] overflow-hidden flex flex-col pt-[1.25rem] px-[0rem] pb-[0rem] box-border items-center justify-start gap-[1.63rem] max-w-full max-h-full text-left text-[1.25rem] text-text-primary font-sf-pro-display">
        <div
          className="w-[21.88rem] h-[3rem] flex flex-row items-start justify-between cursor-pointer"
          onClick={openServicePopup}
        >
          <div className="flex flex-col items-start justify-start gap-[0.25rem]">
            <div className="relative tracking-[-0.02em] font-medium">
              Nail design – 1 difficulty
            </div>
            <div className="relative text-[1.06rem] tracking-[-0.03em] font-medium font-sf-pro-text text-text-secondary">
              90m
            </div>
          </div>
          <div className="rounded-xl bg-telegram [backdrop-filter:blur(8px)] h-[2.25rem] overflow-hidden flex flex-row py-[0.13rem] px-[0.75rem] box-border items-center justify-center text-right text-[1.13rem] text-text-white font-sf-pro-text">
            <div className="relative tracking-[-0.03em] font-medium">$120</div>
          </div>
        </div>
        <div className="relative text-[0.88rem] tracking-[-0.03em] leading-[1.25rem] font-sf-pro-text text-black inline-block w-[21.88rem]">
          it is a trend for all time. It always looks unusual, interesting and
          very gentle. It seems as if an artistic canvas has been recreated on
          the nails! This nail design is suitable for girls with good taste who
          do not like to be in the shade.
        </div>
        <div
          className="bg-telegram [backdrop-filter:blur(8px)] w-[24.38rem] h-[5.25rem] overflow-hidden shrink-0 flex flex-row py-[1.5rem] px-[7.38rem] box-border items-start justify-start cursor-pointer text-text-white font-sf-pro"
          onClick={onFrameContainer3Click}
        >
          <div className="relative tracking-[-0.03em] leading-[1.5rem] font-medium">
            Continue to book
          </div>
        </div>
      </div>
      {isServicePopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeServicePopup}
        >
          <ServicePopup onClose={closeServicePopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default ServicePopup;

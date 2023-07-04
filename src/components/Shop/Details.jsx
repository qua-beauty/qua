import React, { FunctionComponent } from "react";
import MasterActions from "./MasterActions";
import Portfolio from "../Portfolio";

import Location from '../Location';

const Details = ({ master }) => {
  return master && (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex flex-col space-y-4 items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img src={master.avatar} alt="Master Avatar" className="w-full h-full object-cover" />
        </div>
        <div className={`bg-${master.category.color} text-${master.category.textColor} text-md`}>
          {master.category.name}
        </div>
        <h1 className="-mt-2 text-4xl font-medium">{master.name}</h1>
        <div className="absolute top-4 right-4">
          <Location>300m</Location>
        </div>
      </div>
      <MasterActions />
      <p className="text-md">{master.about}</p>
      <Portfolio portfolio={master.portfolio} />
    </div>
  );
};

export default Details;

import * as React from 'react';
import Slider from '@mui/base/Slider';
import { useColorMode } from '@chakra-ui/react';

function SliderValueLabel({ children }) {
  return <span className="valueLabel">{children}</span>;
}

const marks = [
  {
    value: 0,
    label: '0km',
  },
  {
    value: 10,
    label: '10km',
  },
  {
    value: 20,
    label: '20km',
  }
];

function valuetext(value) {
  return `${value}km`;
}


export default function SliderControl() {
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark';

  return (
    <div className={isDarkMode ? 'dark' : ''} style={{ width: 300 }}>
      <Slider
        max={30}
        marks={marks}

        getAriaValueText={valuetext}
        slots={{ valueLabel: SliderValueLabel }}

        slotProps={{
          root: ({ disabled }) => ({
            className: `h-[72px] w-full rounded-full py-2.5 inline-block relative touch-none ${
              disabled
                ? 'opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600'
                : 'hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400'
            }`,
          }),
          rail: {
            className: 'block absolute rounded-full w-full  h-[32px] bg-current opacity-40',
          },
          mark: {
            className: `hidden absolute mt-10 w-1 h-1 rounded-full bg-[#8951FF] -translate-x-2/4`
          },
          markLabel: {
            className: 'absolute mt-10 t-[20px] text-[12px] weight-[600]'
          },
          track: { className: 'block absolute h-[32px]  rounded-l-full bg-current' },
          thumb: (_, { active, focused }) => ({
            className: `absolute w-[41px] h-[41px] flex items-center -ml-[12px] justify-center text-white -mt-1.5 box-border rounded-full outline-0 border-3 border-solid border-current bg-[#8951FF] hover:shadow-outline-purple ${
              focused || active ? 'shadow-outline-purple' : ''
            }`,
          }),
        }}
        defaultValue={10}
      />
    </div>
  );
}
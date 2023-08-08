import { Radio } from '@material-tailwind/react';
import React, { useState } from 'react';

type Props = {
  color: string;
  hoverColor?: string;
};

//상위 컴포넌트에서 매핑하는 형태
{
  /* <div className="flex w-[360px] mt-5 overflow-auto">
                {arr.map((container, key) => (
                  <ColorContainer
                    key={key}
                    color={container.color}
                    hoverColor={container.hoverColor}
                  />
                ))}
              </div> */
}

const ColorContainer = (props: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onButtonClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Radio
      name="type"
      ripple={false}
      icon={<i className="fa-solid fa-check text-white text-sm"></i>}
      className={`${props.color} ${props.hoverColor} p-0 transition-all hover:before:opacity-0 border-0 rounded-lg`}
    />
  );
};

export default ColorContainer;

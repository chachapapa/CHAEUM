import { Radio } from '@material-tailwind/react';
import React from 'react';

type Props = {
  color: string;
  hoverColor?: string;
  value?: string;
  defaultChecked?: boolean;
  handleColor(value: string): void;
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

const ColorContainer = ({ ...props }: Props) => {
  const onButtonClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    props.handleColor(value); // 상위 컴포넌트의 onChange 콜백 호출
  };

  return (
    <>
      {props.defaultChecked ? (
        <Radio
          name="type"
          ripple={false}
          icon={<i className="fa-solid fa-check text-white text-sm"></i>}
          className={`modifymode ${props.color} ${props.hoverColor} p-0 transition-all hover:before:opacity-0 border-0 rounded-lg`}
          value={`${props.value}`}
          onChange={onButtonClick}
          checked={props.defaultChecked}
        />
      ) : (
        <Radio
          name="type"
          ripple={false}
          icon={<i className="fa-solid fa-check text-white text-sm"></i>}
          className={`creativemode ${props.color} ${props.hoverColor} p-0 transition-all hover:before:opacity-0 border-0 rounded-lg`}
          value={`${props.value}`}
          onChange={onButtonClick}
        />
      )}
    </>
  );
};

export default ColorContainer;

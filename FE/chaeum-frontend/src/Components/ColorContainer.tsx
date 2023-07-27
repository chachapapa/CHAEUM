import React from 'react';

type Props = {
  color: string;
};

//상위 컴포넌트에서 매핑하는 형태
{/* <div className="flex">
  {arr.map((container, key) => (
    <ColorContainer key={key} color={container} />
  ))}
</div>; */}

const ColorContainer = (props: Props) => {
  return <div className={`w-6 h-6 mr-2 ${props.color}`}></div>;
};

export default ColorContainer;

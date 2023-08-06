import React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

/*
  사용 예시

  <PhraseCard
    title="어제의 나는 오늘의 적"
    ment="지난 주 평균 시간은 14.5시간이었습니다. 5시간만 더하세요."
  ></PhraseCard>

*/

type Props = {
  title: string;
  ment: string;
};

const PhraseCard = (props: Props) => {
  const [open, setOpen] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);

  const handleAlwaysOpen = () => setAlwaysOpen(cur => !cur);
  // const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={alwaysOpen} className="w-60">
        <AccordionHeader onClick={handleAlwaysOpen}>
          {props.title}
        </AccordionHeader>
        <AccordionBody> {props.ment} </AccordionBody>
      </Accordion>
    </>
  );
};

export default PhraseCard;

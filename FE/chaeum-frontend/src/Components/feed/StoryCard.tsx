/* eslint-disable react/react-in-jsx-scope */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from '@material-tailwind/react';
import ActivityOutlineCard from './write/ActivityOutlineCard';

/*
  사용법

  <StoryCard
    nickname="chacha"
    ment="나는 산양이 될테야"
    tag="#클라이밍"
    time="02:23:21"
  ></StoryCard>
*/

type Props = {
  nickname: string;
  ment: string;
  tag: string;
  time: string;
};

const StoryCard = (props: Props) => {
  return (
    <Card
      color="transparent"
      shadow={false}
      className="w-full max-w-[18rem] rounded-lg"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="../chacha1.jpg"
          alt="chacha"
        />
        <div className="flex w-full flex-col gap-0.5">
          <Typography variant="h5" color="blue-gray">
            {props.nickname}
          </Typography>
          <Typography color="blue-gray">{props.ment}</Typography>
          <Typography color="blue-gray">{props.tag}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <ActivityOutlineCard
          color="yellow"
          tag={props.tag}
          time={props.time}
        ></ActivityOutlineCard>
        <div className="flex items-center justify-between">
          <Typography variant="h2">{props.time}</Typography>
          <img
            className="justify-content flex-end"
            src="../icon/heart.png"
            alt="heart"
          ></img>
        </div>
      </CardBody>
    </Card>
  );
};

export default StoryCard;

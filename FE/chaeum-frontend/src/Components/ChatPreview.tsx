import React from 'react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from '@material-tailwind/react';

const ChatPreview = () => {
  return (
    // <Card className="w-96">
    <List>
      <ListItem className="border-b border-chaeum-gray-300 rounded-none">
        <ListItemPrefix>
          <Avatar variant="circular" alt="candice" src="./chacha1.jpg" />
        </ListItemPrefix>
        <div className="w-64">
          <Typography variant="h6" color="blue-gray">
            chacha
          </Typography>
          <div className="flex items-center justify-between">
            <Typography variant="small" color="gray" className="font-normal">
              제일 최근 메세지가 노출될 예정
            </Typography>
            <div className="text-xs">10분전</div>
          </div>
        </div>
      </ListItem>
    </List>
    // </Card>
  );
};

export default ChatPreview;

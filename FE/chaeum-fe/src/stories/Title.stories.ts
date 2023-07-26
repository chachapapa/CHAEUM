import { Meta, StoryObj } from '@storybook/react';
import Title from '../Components/Title';

const meta = {
  title: 'Components/Title',
  component: Title,
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'storytest',
  },
};

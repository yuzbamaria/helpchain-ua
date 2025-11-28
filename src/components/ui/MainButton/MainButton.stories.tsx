import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import MainButton from "@/components/ui/MainButton/MainButton";

const meta: Meta<typeof MainButton> = {
  component: MainButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ["primary", "accent"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["md", "lg"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Text", 
    variant: "primary",
    size: "lg",
  },
};

export const Accent: Story = {
  args: {
    children: "Text", 
    variant: "accent",
    size: "lg",
  },
};


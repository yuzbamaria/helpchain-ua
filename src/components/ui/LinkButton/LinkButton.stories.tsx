import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
// add tests
import { expect } from "storybook/test";
import LinkButton from "@/components/ui/LinkButton/LinkButton";
import { ArrowLeft, ArrowRight } from "@/icons";

const meta: Meta<typeof LinkButton> = {
  component: LinkButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    state: {
      options: ["normal", "hover", "pressed"],
      control: { type: "select" },
    },
  },
  args: {
    onClick: fn(),
    size: "md",
    state: "normal",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    children: "Text",
    variant: "left",
    size: "md",
    iconLeft: <ArrowLeft className="w-6 h-6" />,
  },
};

export const Right: Story = {
  args: {
    children: "Text",
    variant: "right",
    size: "md",
    iconLeft: <ArrowRight className="w-6 h-6" />,
  },
};

import React, { useState } from "react";
import TextInput, { TextInputProps } from "@/components/ui/TextInput";
import { StoryFn  } from "@storybook/react";
import { EyeOn, EyeOff } from "@/icons/index";

export default {
  title: "Components/TextInput",
  component: TextInput,
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
    showIconButton: { control: "boolean" },
    iconName: {
      control: {
        type: "select",
        options: ["none", "eyeOn", "eyeOff"],
      },
      description: "Select the icon to display",
    },
  },
};


type IconName = "none" | "eyeOn" | "eyeOff";

const icons: Record<IconName, React.ReactNode> = {
  none: null,
  eyeOn: <EyeOn />,
  eyeOff: <EyeOff />,
};

const Template: StoryFn<TextInputProps & { iconName: IconName }> = (args) => {
  const [value, setValue] = useState("");

  return (
    <TextInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      icon={icons[args.iconName]}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Your name",
  helperText: "Enter your full name",
  error: "",
  touched: false,
  showIconButton: true,
  iconName: "eyeOn",
};

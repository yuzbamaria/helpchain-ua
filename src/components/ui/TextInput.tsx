"use client";
import { useState, useEffect } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;      
  className?: string;
  error?: string;
  helperText?: string;
  touched?: boolean;
  showIconButton?: boolean;
  onIconButtonClick?: () => void;
}

export default function TextInput({ label,
  error,
  touched,
  helperText,
  showIconButton = false,
  onIconButtonClick,
  icon,
  className = "",
  type = "text",
  onFocus,
  onBlur,
  ...rest }: TextInputProps) {

};
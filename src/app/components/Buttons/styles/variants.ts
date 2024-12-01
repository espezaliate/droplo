import { ButtonTypes } from "../types/button";

const baseStyles = "py-2.5 px-3.5 font-semibold";

export const buttonColors = {
  [ButtonTypes.PRIMARY]: {
    bg: "bg-button-primary-bg",
    text: "text-button-primary-fg",
    border: "border-button-primary-border",
  },
  [ButtonTypes.SECONDARY]: {
    bg: "bg-button-secondary-bg",
    text: "text-button-secondary-fg",
    border: "border-button-secondary-border",
  },
  [ButtonTypes.TERTIARY]: {
    bg: "bg-button-tertiary-bg",
    text: "text-button-tertiary-fg",
    border: "border-button-tertiary-border",
  },
};

export const buttonVariantStyles = Object.fromEntries(
  Object.entries(buttonColors).map(([key, value]) => [
    key,
    `${baseStyles} ${value.bg} ${value.text} ${value.border}`,
  ])
);

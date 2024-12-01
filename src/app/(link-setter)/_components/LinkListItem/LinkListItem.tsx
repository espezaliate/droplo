import { MoveIcon } from "@/app/assets/icons/MoveIcon";
import { Box } from "@/app/components/Box/Box";
import { Button } from "@/app/components/Buttons/Button";
import { ButtonGroup } from "@/app/components/Buttons/ButtonGroup";
import { ButtonTypes } from "@/app/components/Buttons/types/button";
import React from "react";

interface LinkListItemProps {
  name: string;
  url?: string;
}

export const LinkListItem: React.FC<LinkListItemProps> = ({ name, url }) => {
  const buttons = [
    { label: "Usuń" },
    { label: "Edytuj" },
    { label: "Dodaj pozycję menu" },
  ];
  return (
    <div className="flex py-4 px-6 bg-bg-primary text-sm justify-between w-full">
      <div className="flex items-center">
        <MoveIcon />
        <div className="flex flex-col gap-1.5">
          <span className="text-text-primary font-semibold">{name}</span>
          <span className="text-text-tertiary">{url ? url : "Brak linku"}</span>
        </div>
      </div>
      <div>
        <ButtonGroup buttons={buttons} variant={ButtonTypes.SECONDARY} />
      </div>
    </div>
  );
};

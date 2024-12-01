import { Box } from "@/app/components/Box/Box";
import { Link } from "@/app/types/interfaces/LinkSetter";
import React from "react";
import { LinkListItem } from "../LinkListItem/LinkListItem";
import { Button } from "@/app/components/Buttons/Button";
import { ButtonTypes } from "@/app/components/Buttons/types/button";

interface LinkListContainerProps {
  linkList: Link[];
}

export const LinkListContainer: React.FC<LinkListContainerProps> = ({
  linkList,
}) => {
  return (
    <Box className="flex flex-col divide-y divide-border-primary">
      {linkList.map((link) => (
        <LinkListItem name={link.name} url={link.url} key={link.key} />
      ))}
      <div className="py-5 px-6">
        <Button variant={ButtonTypes.SECONDARY}>Dodaj pozycję menu</Button>
      </div>
    </Box>
  );
};

import { Box } from "@/app/components/Box/Box";
import { Link } from "@/app/types/interfaces/LinkSetter";
import React, { useState } from "react";
import { LinkListItem } from "../LinkListItem/LinkListItem";
import { Button } from "@/app/components/Buttons/Button";
import { ButtonTypes } from "@/app/components/Buttons/types/button";
import { ManageLink } from "../ManageLink/ManageLink";
import { findLargestKey } from "../../_utils/findLargestKey";
import { MAX_OPEN_POSITIONS } from "../../_utils/constants";

interface LinkListContainerProps {
  linkList: Link[];
  setLinkList: React.Dispatch<React.SetStateAction<Link[]>>;
}

export const LinkListContainer: React.FC<LinkListContainerProps> = ({
  linkList,
  setLinkList,
}) => {
  const [addLinkModes, setAddLinkModes] = useState<number[]>([]);

  const handleAddLink = () => {
    const newKey = findLargestKey(linkList) + (addLinkModes.length + 1);
    setAddLinkModes((prev) => [...prev, newKey]);
  };

  const handleCancelLink = (key: number) => {
    setAddLinkModes((prev) => prev.filter((k) => k !== key));
  };

  return (
    <Box className="flex flex-col divide-y divide-border-primary">
      {linkList.map((link) => (
        <LinkListItem link={link} key={link.key} setLinkList={setLinkList} />
      ))}
      {addLinkModes.map((key) => (
        <div className="py-4 px-6" key={key}>
          <ManageLink
            setLinkList={setLinkList}
            linkKey={key.toString()}
            cancel={() => handleCancelLink(key)}
          />
        </div>
      ))}
      <div className="py-5 px-6">
        <Button
          onClick={handleAddLink}
          variant={ButtonTypes.SECONDARY}
          disabled={addLinkModes.length >= MAX_OPEN_POSITIONS}
          title={
            addLinkModes.length >= MAX_OPEN_POSITIONS
              ? `Nie możesz mieć więcej niż ${MAX_OPEN_POSITIONS} otwarte pozycje.`
              : undefined
          }
        >
          Dodaj pozycję menu
        </Button>
      </div>
    </Box>
  );
};

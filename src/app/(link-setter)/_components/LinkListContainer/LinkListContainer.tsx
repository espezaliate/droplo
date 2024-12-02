import { Box } from "@/app/components/Box/Box";
import { Link } from "@/app/types/interfaces/LinkSetter";
import React, { useState } from "react";
import { LinkListItem } from "../LinkListItem/LinkListItem";
import { Button } from "@/app/components/Buttons/Button";
import { ButtonTypes } from "@/app/components/Buttons/types/button";
import { ManageLink } from "../ManageLink/ManageLink";
import { findLargestKey } from "../../_utils/findLargestKey";
import { MAX_OPEN_POSITIONS } from "../../_utils/constants";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

interface LinkListContainerProps {
  linkList: Link[];
  setLinkList: React.Dispatch<React.SetStateAction<Link[]>>;
}

const renderLinks = (
  links: Link[],
  setLinkList: React.Dispatch<React.SetStateAction<Link[]>>,
  parentKey: string | null = null
) => {
  // Filter links to find direct children of the current parent
  const parentChildren = links.filter((link) => {
    if (parentKey === null) {
      // Root-level links have no parent
      return !link.key.includes("-");
    }
    const childKeyParts = link.key.split("-");
    const parentKeyParts = parentKey.split("-");
    return (
      childKeyParts.length === parentKeyParts.length + 1 &&
      link.key.startsWith(`${parentKey}-`)
    );
  });

  return parentChildren.map((link) => (
    <div key={link.key}>
      <LinkListItem link={link} linkList={links} setLinkList={setLinkList} />
      <div className="pl-4">
        {/* Recursively render children */}
        {renderLinks(links, setLinkList, link.key)}
      </div>
    </div>
  ));
};

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

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    console.log(e);
    if (!over || !active.data.current || over.id === active.id) return;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={linkList}>
        <Box className="flex flex-col divide-y divide-border-primary">
          {renderLinks(linkList, setLinkList)}
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
      </SortableContext>
    </DndContext>
  );
};

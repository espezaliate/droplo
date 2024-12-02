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
    if (!over || !active.data.current || over.id === active.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeData = active.data.current;

    setLinkList((prevLinks) => {
      const findLinkByKey = (links: Link[], key: string): Link | null => {
        for (const link of links) {
          if (link.key === key) return link;
          if (link.children) {
            const found = findLinkByKey(link.children, key);
            if (found) return found;
          }
        }
        return null;
      };

      const removeActiveData = (links: Link[]): Link[] =>
        links
          .filter((link) => link.key !== activeId)
          .map((link) => ({
            ...link,
            children: link.children
              ? removeActiveData(link.children)
              : undefined,
          }));
      const insertActiveData = (links: Link[], activeData: Link): Link[] => {
        return links.map((link) => {
          if (link.key === overId) {
            const newChildren = link.children ? [...link.children] : [];
            const newKey = `${overId}-${newChildren.length}`;
            newChildren.push({
              ...activeData,
              key: newKey,
            });
            return { ...link, children: newChildren };
          }

          return {
            ...link,
            children: link.children
              ? insertActiveData(link.children, activeData)
              : undefined,
          };
        });
      };

      const linksWithoutActive = removeActiveData(prevLinks);

      const updatedLinks = insertActiveData(
        linksWithoutActive,
        activeData as Link
      );

      return updatedLinks;
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={linkList}>
        <Box className="flex flex-col divide-y divide-border-primary">
          {linkList.map((link) => (
            <LinkListItem
              link={link}
              key={link.key}
              setLinkList={setLinkList}
              linkList={linkList}
            />
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
      </SortableContext>
    </DndContext>
  );
};

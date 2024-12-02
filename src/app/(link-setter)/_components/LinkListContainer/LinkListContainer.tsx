import { Box } from "@/app/components/Box/Box";
import { Link } from "@/app/types/interfaces/LinkSetter";
import React, { useState } from "react";
import { Button } from "@/app/components/Buttons/Button";
import { ButtonTypes } from "@/app/components/Buttons/types/button";
import { ManageLink } from "../ManageLink/ManageLink";
import { MAX_OPEN_POSITIONS } from "../../_utils/constants";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import {
  areKeysSiblings,
  findLargestKey,
  getNextChildKey,
  getNextSiblingKey,
  regenerateKeys,
  sortByKeys,
} from "../../_utils/helpers";
import { renderLinks } from "./renderLinks";

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

    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeItem = linkList.find((link) => link.key === activeId);
    const overItem = linkList.find((link) => link.key === overId);

    if (!activeItem || !overItem) return;

    const newList = [...linkList];
    const activeKeySegments = activeId.split("-");
    const overKeySegments = overId.split("-");

    if (areKeysSiblings(activeId, overId)) {
      const parentKeySegments = activeKeySegments.slice(0, -1);
      const parentKey = parentKeySegments.join("-");
      const siblings = newList.filter((link) =>
        parentKey
          ? link.key.startsWith(`${parentKey}-`) &&
            link.key.split("-").length - 1 === parentKeySegments.length
          : !link.key.includes("-")
      );

      const siblingKeys = siblings.map((link) => link.key);
      const activeIndex = siblingKeys.indexOf(activeId);
      const overIndex = siblingKeys.indexOf(overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        siblings.splice(activeIndex, 1);

        siblings.splice(overIndex, 0, activeItem);

        siblings.forEach((sibling, index) => {
          sibling.key = parentKey ? `${parentKey}-${index}` : `${index}`;
        });

        const updatedList = newList.map((link) => {
          const isSibling = siblings.some(
            (sibling) => sibling.key === link.key
          );
          return isSibling
            ? siblings.find((sib) => sib.key === link.key)!
            : link;
        });

        setLinkList(updatedList);
        return;
      }
    }

    const activeIndex = newList.indexOf(activeItem);
    newList.splice(activeIndex, 1);

    let newKey;
    if (overKeySegments.length >= activeKeySegments.length) {
      newKey = getNextChildKey(overId, newList);
    } else {
      const parentKey = overKeySegments.slice(0, -1).join("-");
      const siblings = newList.filter((link) =>
        parentKey
          ? link.key.startsWith(`${parentKey}-`)
          : !link.key.includes("-")
      );

      const nextSiblingIndex = getNextSiblingKey(siblings, parentKey);
      newKey = parentKey
        ? `${parentKey}-${nextSiblingIndex}`
        : `${nextSiblingIndex}`;
    }

    activeItem.key = newKey;
    newList.push(activeItem);

    const regeneratedList = regenerateKeys(newList);
    setLinkList(regeneratedList);
  };

  console.log(linkList);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={sortByKeys(linkList).map((value) => value.key)}>
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

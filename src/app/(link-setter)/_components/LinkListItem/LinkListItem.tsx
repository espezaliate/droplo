import { MoveIcon } from "@/app/assets/icons/MoveIcon";
import { ButtonGroup } from "@/app/components/Buttons/ButtonGroup";
import { ButtonTypes } from "@/app/components/Buttons/types/button";
import { Link } from "@/app/types/interfaces/LinkSetter";
import React, { useState } from "react";
import { ManageLink } from "../ManageLink/ManageLink";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface LinkListItemProps {
  link: Link;
  linkList: Link[];
  setLinkList: React.Dispatch<React.SetStateAction<Link[]>>;
  parentEditMode?: boolean;
}

export const LinkListItem: React.FC<LinkListItemProps> = ({
  link,
  linkList,
  setLinkList,
  parentEditMode,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [addLinkModes, setAddLinkModes] = useState<number[]>([]);
  const { id, name, url, key } = link;
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: key,
  });
  const {
    setNodeRef: setDraggableNodeRef,
    active,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: key, data: link });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };
  const nestLevel = key.split("-").length - 1;
  const keyArray = key.split("-");
  const indentation = {
    marginLeft: nestLevel * 4 + "rem",
  };
  console.log(linkList);
  const hasChildren = linkList.some(
    (value) => value.key.split("-").splice(0, -1).join("") === keyArray.join("")
  );

  const handleAddLink = (parentKey: string) => {
    const parentChildren = linkList.filter((link) => {
      const childKeyParts = link.key.split("-");
      const parentKeyParts = parentKey.split("-");
      return (
        childKeyParts.length === parentKeyParts.length + 1 &&
        link.key.startsWith(`${parentKey}-`)
      );
    });

    const childIndices = parentChildren.map((child) => {
      const segments = child.key.split("-");
      return Number(segments[segments.length - 1]);
    });
    const nextChildIndex =
      childIndices.length > 0 ? Math.max(...childIndices) + 1 : 0;

    setAddLinkModes((prev) => [...prev, nextChildIndex]);
  };

  const handleCancelLink = (modeKey: number) => {
    setAddLinkModes((prev) => prev.filter((k) => k !== modeKey));
  };

  const handleDelete = (keyToDelete: string) => {
    const isAffectedSibling = (
      linkKey: string,
      deleteKeySegments: string[]
    ) => {
      const keySegments = linkKey.split("-");
      const sameParent =
        keySegments.slice(0, deleteKeySegments.length - 1).join("-") ===
        deleteKeySegments.slice(0, -1).join("-");
      const comesAfterDeletedSibling =
        Number(keySegments[deleteKeySegments.length - 1]) >
        Number(deleteKeySegments[deleteKeySegments.length - 1]);

      return sameParent && comesAfterDeletedSibling;
    };

    const deleteKeySegments = keyToDelete.split("-");

    const remainingLinks = linkList.filter(
      (link) => !link.key.startsWith(keyToDelete)
    );

    const updatedLinks = remainingLinks.map((link) => {
      if (isAffectedSibling(link.key, deleteKeySegments)) {
        const keySegments = link.key.split("-");
        keySegments[deleteKeySegments.length - 1] = String(
          Number(keySegments[deleteKeySegments.length - 1]) - 1
        );
        return {
          ...link,
          key: keySegments.join("-"),
        };
      }
      return link;
    });
    setLinkList(updatedLinks);
  };

  const buttons = [
    {
      label: "Usuń",
      props: { onClick: () => handleDelete(key) },
    },
    { label: "Edytuj", props: { onClick: () => setEditMode(true) } },
    {
      label: "Dodaj pozycję menu",
      props: { onClick: () => handleAddLink(key) },
    },
  ];

  return (
    <div className="flex flex-col border-none" ref={setDraggableNodeRef}>
      {!editMode && (
        <div
          ref={setDroppableNodeRef}
          className={`flex py-4 px-6 bg-bg-primary border-border-primary text-sm justify-between border-b
            ${nestLevel > 0 ? "rounded-bl-lg border-l" : ""} 
          ${parentEditMode ? "rounded-tl-lg border-t" : ""}
          `}
          style={{
            ...indentation,
          }}
        >
          <div className="flex items-center" ref={setDraggableNodeRef}>
            <div {...attributes} {...listeners} style={style}>
              <MoveIcon />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-text-primary font-semibold">{name}</span>
              <span className="text-text-tertiary">{url || "Brak linku"}</span>
            </div>
          </div>
          <ButtonGroup buttons={buttons} variant={ButtonTypes.SECONDARY} />
        </div>
      )}
      <div style={{ ...indentation }}>
        {editMode ? (
          <div className="py-5 pr-6">
            <ManageLink
              setLinkList={setLinkList}
              linkKey={key}
              cancel={() => setEditMode(false)}
              link={link}
            />
          </div>
        ) : (
          addLinkModes.map((modeKey) => (
            <div key={modeKey} className="py-5 pr-6 ml-16">
              <ManageLink
                setLinkList={setLinkList}
                linkKey={`${key}-${modeKey}`}
                cancel={() => handleCancelLink(modeKey)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

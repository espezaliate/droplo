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
  const { id, name, url, key, children } = link;
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

  const nestLevel = key.split("-").length;
  const handleAddLink = () => {
    const newKey = Number(key.split("-").pop() || 0);
    setAddLinkModes((prev) => [...prev, newKey]);
  };

  const handleCancelLink = (modeKey: number) => {
    setAddLinkModes((prev) => prev.filter((k) => k !== modeKey));
  };

  const handleDelete = (id: string) => {
    setLinkList((prev) => {
      const deleteRecursively = (links: Link[], targetId: string): Link[] => {
        return links
          .filter((l) => l.id !== targetId)
          .map((l) => ({
            ...l,
            children: l.children
              ? deleteRecursively(l.children, targetId)
              : undefined,
          }));
      };

      return deleteRecursively(prev, id);
    });
  };

  const buttons = [
    {
      label: "Usuń",
      props: { onClick: () => handleDelete(id) },
    },
    { label: "Edytuj", props: { onClick: () => setEditMode(true) } },
    { label: "Dodaj pozycję menu", props: { onClick: () => handleAddLink() } },
  ];

  return (
    <div className="flex flex-col" ref={setDraggableNodeRef}>
      {!editMode && (
        <div
          ref={setDroppableNodeRef}
          className={`flex py-4 px-6 bg-bg-primary border-border-primary text-sm justify-between w-full 
            ${nestLevel > 1 ? "rounded-bl-lg border-l" : ""} 
          ${
            (children && children.length > 0) || addLinkModes.length > 0
              ? "border-b"
              : ""
          }
          ${parentEditMode ? "rounded-tl-lg border-t" : ""}
          `}
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
      {editMode ? (
        <div className="py-5 pr-6">
          {" "}
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

      {link.children?.map((child) => (
        <div key={child.key} className="ml-16">
          <LinkListItem
            link={child}
            setLinkList={setLinkList}
            linkList={linkList}
            parentEditMode={editMode}
          />
        </div>
      ))}
    </div>
  );
};

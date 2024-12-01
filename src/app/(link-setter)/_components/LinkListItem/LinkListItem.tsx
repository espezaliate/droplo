import { MoveIcon } from "@/app/assets/icons/MoveIcon";
import { ButtonGroup } from "@/app/components/Buttons/ButtonGroup";
import { ButtonTypes } from "@/app/components/Buttons/types/button";
import { Link } from "@/app/types/interfaces/LinkSetter";
import React, { useState } from "react";
import { ManageLink } from "../ManageLink/ManageLink";

interface LinkListItemProps {
  link: Link;
  setLinkList: React.Dispatch<React.SetStateAction<Link[]>>;
}

export const LinkListItem: React.FC<LinkListItemProps> = ({
  link,
  setLinkList,
}) => {
  const [editMode, setEditMode] = useState<Boolean>(false);
  const { id, name, url, key } = link;
  const buttons = [
    {
      label: "Usuń",
      props: {
        onClick: () => setLinkList((prev) => prev.filter((l) => l.id !== id)),
      },
    },
    { label: "Edytuj", props: { onClick: () => setEditMode(true) } },
    { label: "Dodaj pozycję menu" },
  ];
  if (editMode) {
    return (
      <ManageLink
        setLinkList={setLinkList}
        linkKey={key}
        cancel={() => setEditMode(false)}
        link={link}
      />
    );
  }

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

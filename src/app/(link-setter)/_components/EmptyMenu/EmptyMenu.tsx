import React, { useState } from "react";
import { Button } from "@/app/components/Buttons/Button";
import { AddIcon } from "@/app/assets/icons/AddIcon";
import { ManageLink } from "../ManageLink/ManageLink";
import { Link } from "@/app/types/interfaces/LinkSetter";

interface EmptyMenuProps {
  setLinkList: React.Dispatch<React.SetStateAction<Link[]>>;
}

export const EmptyMenu: React.FC<EmptyMenuProps> = ({ setLinkList }) => {
  const [addLinkOpen, setAddLinkOpen] = useState<Boolean>();

  const onCancelAddLink = () => setAddLinkOpen(false);

  if (!addLinkOpen) {
    return (
      <div className="py-6 px-4 gap-6 flex flex-col bg-bg-secondary border-border-secondary border rounded-lg">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-center">Menu jest puste</span>
          <span className="font-light text-center text-text-tertiary">
            W tym menu nie ma jeszcze żadnych linków.
          </span>
        </div>
        <div className="mx-auto">
          <Button onClick={() => setAddLinkOpen(true)}>
            <div className="flex justify-center align-middle gap-3">
              <AddIcon />
              <span>Dodaj pozycję menu</span>
            </div>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ManageLink
      setLinkList={setLinkList}
      cancel={onCancelAddLink}
      linkKey="1"
    />
  );
};

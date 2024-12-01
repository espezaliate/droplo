import React from "react";
import { Button } from "@/app/components/Buttons/Button";
import { AddIcon } from "@/app/assets/icons/AddIcon";

export const EmptyMenu = () => {
  return (
    <div className="py-6 px-4 gap-6 flex flex-col bg-bg-secondary border-border-secondary border rounded-lg">
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-center">Menu jest puste</span>
        <span className="font-light text-center text-text-tertiary">
          W tym menu nie ma jeszcze żadnych linków.
        </span>
      </div>
      <div className="mx-auto">
        <Button>
          <div className="flex justify-center align-middle gap-3">
            <AddIcon />
            <span>Dodaj pozycję menu</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

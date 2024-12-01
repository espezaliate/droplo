import { DeleteIcon } from "@/app/assets/icons/DeleteIcon";
import { SearchIcon } from "@/app/assets/icons/SearchIcon";
import { Box } from "@/app/components/Box/Box";
import { Button } from "@/app/components/Buttons/Button";
import { ButtonTypes } from "@/app/components/Buttons/types/button";
import { Input } from "@/app/components/Input/Input";
import { Link, ManageLinkFormValues } from "@/app/types/interfaces/LinkSetter";
import React from "react";
import { useForm } from "react-hook-form";

interface ManageLinkProps {
  setLinkList: React.Dispatch<React.SetStateAction<Link[]>>;
  key: string;
  id?: string;
}

export const ManageLink: React.FC<ManageLinkProps> = ({
  setLinkList,
  key,
  id,
}) => {
  const { handleSubmit } = useForm<ManageLinkFormValues>();

  const onSubmit = handleSubmit((data) => {
    if (id) {
      setLinkList((prev) =>
        prev.map((link) => (id === link.id ? { ...link, ...data } : link))
      );
    } else {
      const id = crypto.randomUUID();
      setLinkList((prev) => [...prev, { id, key, ...data }]);
    }
  });

  return (
    <Box className="py-5 px-6 bg-bg-primary">
      <form onSubmit={onSubmit} className="gap-5 flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex gap-4">
            <div className="flex flex-col w-full gap-2">
              <Input label="Nazwa" placeholder="np. Promocje" />
              <Input
                label="Link"
                placeholder="Wklej lub wyszukaj"
                addOn={<SearchIcon />}
              />
            </div>
            <DeleteIcon />
          </div>
          <div className="flex gap-2">
            <Button variant={ButtonTypes.SECONDARY}>Anuluj</Button>
            <Button variant={ButtonTypes.TERTIARY}>Dodaj</Button>
          </div>
        </div>
      </form>
    </Box>
  );
};

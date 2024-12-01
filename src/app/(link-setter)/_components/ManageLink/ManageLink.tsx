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
  linkKey: string;
  cancel: () => void;
  link?: Link;
}

export const ManageLink: React.FC<ManageLinkProps> = ({
  setLinkList,
  cancel,
  linkKey,
  link,
}) => {
  const { handleSubmit, register } = useForm<ManageLinkFormValues>({
    defaultValues: link ? link : { name: "", url: "" },
  });

  const onSubmit = handleSubmit((data) => {
    if (link) {
      setLinkList((prev) =>
        prev.map((l) => (l.id === link.id ? { ...link, ...data } : l))
      );
    } else {
      const id = crypto.randomUUID();
      setLinkList((prev) => [...prev, { id, key: linkKey, ...data }]);
    }
    cancel();
  });

  return (
    <Box className="py-5 px-6 bg-bg-primary">
      <form onSubmit={onSubmit} className="gap-5 flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex gap-4">
            <div className="flex flex-col w-full gap-2">
              <Input
                label="Nazwa"
                placeholder="np. Promocje"
                {...register("name", { required: true })}
              />
              <Input
                label="Link"
                placeholder="Wklej lub wyszukaj"
                addOn={<SearchIcon />}
                {...register("url")}
              />
            </div>
            <DeleteIcon onClick={() => cancel()} className="cursor-pointer" />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => cancel()} variant={ButtonTypes.SECONDARY}>
              Anuluj
            </Button>
            <Button type="submit" variant={ButtonTypes.TERTIARY}>
              {link ? "Zapisz" : "Dodaj"}
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
};

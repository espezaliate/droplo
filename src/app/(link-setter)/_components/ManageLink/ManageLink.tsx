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
    const id = crypto.randomUUID();
    const newLink = { id, key: linkKey, ...data };

    setLinkList((prev) => {
      const keySegments = linkKey.split("-").map(Number);

      if (keySegments.length === 1) {
        const existingIndex = prev.findIndex((link) => link.key === linkKey);
        if (existingIndex !== -1) {
          prev[existingIndex] = { ...prev[existingIndex], ...data };
          return [...prev];
        }
        return [...prev, newLink];
      }

      const updatedList = [...prev];

      const insertNestedLink = (links: Link[], levels: number[]): void => {
        const [currentLevel, ...remainingLevels] = levels;
        const parent = links[currentLevel];

        if (!parent) return;
        if (!parent.children) parent.children = [];

        if (remainingLevels.length === 1) {
          const existingChildIndex = parent.children.findIndex(
            (child) => child.key === linkKey
          );

          if (existingChildIndex !== -1) {
            parent.children[existingChildIndex] = {
              ...parent.children[existingChildIndex],
              ...data,
            };
          } else {
            parent.children.push(newLink);
          }
        } else {
          insertNestedLink(parent.children, remainingLevels);
        }
      };

      insertNestedLink(updatedList, keySegments);

      return updatedList;
    });

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

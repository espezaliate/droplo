import { Link } from "@/app/types/interfaces/LinkSetter";

export const findLargestKey = (linkList: Link[]) =>
  Number(
    linkList
      .reduce((prev, curr) =>
        Number(prev.key.split("")[0]) < Number(curr.key.split("")[0])
          ? curr
          : prev
      )
      .key.split("")[0]
  );

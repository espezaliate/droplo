"use client";

import { useState } from "react";
import { EmptyMenu } from "./_components/EmptyMenu/EmptyMenu";
import { ManageLink } from "./_components/ManageLink/ManageLink";
import { Link } from "../types/interfaces/Link";
import { LinkListItem } from "./_components/LinkListItem/LinkListItem";
import { LinkListContainer } from "./_components/LinkListContainer/LinkListContainer";

export default function Home() {
  const [linkList, setLinkList] = useState<Link[]>([
    // { name: "123" },
    // { name: "234" },
  ]);
  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      {!linkList.length ? (
        <EmptyMenu setLinkList={setLinkList} />
      ) : (
        <LinkListContainer linkList={linkList} setLinkList={setLinkList} />
      )}
    </div>
  );
}

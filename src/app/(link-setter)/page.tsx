"use client";

import { useState } from "react";
import { EmptyMenu } from "./_components/EmptyMenu/EmptyMenu";
import { ManageLink } from "./_components/ManageLink/ManageLink";
import { Link } from "../types/interfaces/LinkSetter";

export default function Home() {
  const [linksList, setLinksList] = useState<Link[]>([]);
  return (
    <div className="px-2 py-4">
      <EmptyMenu />
      <ManageLink setLinksList={setLinksList} />
    </div>
  );
}

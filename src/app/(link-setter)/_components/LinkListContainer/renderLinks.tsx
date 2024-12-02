import { Link } from "@/app/types/interfaces/Link";
import { LinkListItem } from "../LinkListItem/LinkListItem";

export const renderLinks = (
  links: Link[],
  setLinkList: React.Dispatch<React.SetStateAction<Link[]>>,
  parentKey: string | null = null
) => {
  const parentChildren = links.filter((link) => {
    if (parentKey === null) {
      return !link.key.includes("-");
    }
    const childKeyParts = link.key.split("-");
    const parentKeyParts = parentKey.split("-");
    return (
      childKeyParts.length === parentKeyParts.length + 1 &&
      link.key.startsWith(`${parentKey}-`)
    );
  });

  return parentChildren.map((link) => (
    <div key={link.key}>
      <LinkListItem link={link} linkList={links} setLinkList={setLinkList} />
      <div className="pl-4 bg-bg-secondary">
        {renderLinks(links, setLinkList, link.key)}
      </div>
    </div>
  ));
};

import { Link } from "@/app/types/interfaces/Link";

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

export const findNestLevel = (key: string) => key.split("-").length;
export const sortByKeys = (list: Link[]): Link[] => {
  return list.sort((a, b) => {
    const aSegments = a.key.split("-").map(Number);
    const bSegments = b.key.split("-").map(Number);

    for (let i = 0; i < Math.max(aSegments.length, bSegments.length); i++) {
      const aSegment = aSegments[i] ?? -1;
      const bSegment = bSegments[i] ?? -1;

      if (aSegment !== bSegment) {
        return aSegment - bSegment;
      }
    }

    return 0;
  });
};
export const getNextSiblingKey = (siblings: Link[], parentKey: string) => {
  if (!siblings.length) return 0;
  const siblingIndices = siblings.map((s) => Number(s.key.split("-").pop()));
  return Math.max(...siblingIndices) + 1;
};

export const getNextChildKey = (
  parentKey: string,
  currentList: Link[]
): string => {
  const directChildLinks = currentList.filter((link) => {
    const linkSegments = link.key.split("-");
    const parentSegments = parentKey.split("-");
    return (
      link.key.startsWith(`${parentKey}-`) &&
      linkSegments.length === parentSegments.length + 1
    );
  });

  const childIndexes = directChildLinks.map((child) =>
    Number(child.key.split("-").pop())
  );
  const nextIndex = childIndexes.length > 0 ? Math.max(...childIndexes) + 1 : 0;
  return `${parentKey}-${nextIndex}`;
};

export const regenerateKeys = (links: Link[]): Link[] => {
  const linksByParent: Record<string, Link[]> = {};

  links.forEach((link) => {
    const segments = link.key.split("-");
    const parentKey =
      segments.length > 1 ? segments.slice(0, -1).join("-") : "";

    if (!linksByParent[parentKey]) {
      linksByParent[parentKey] = [];
    }
    linksByParent[parentKey].push(link);
  });

  const regenerateGroupKeys = (parentKey: string) => {
    const groupLinks = linksByParent[parentKey] || [];
    const sortedLinks = groupLinks.sort((a, b) => {
      const aIndex = Number(a.key.split("-").pop());
      const bIndex = Number(b.key.split("-").pop());
      return aIndex - bIndex;
    });

    sortedLinks.forEach((link, index) => {
      const newKey = parentKey ? `${parentKey}-${index}` : `${index}`;

      link.key = newKey;

      regenerateGroupKeys(newKey);
    });

    return sortedLinks;
  };

  const regeneratedRootLinks = regenerateGroupKeys("");

  return links.map((originalLink) => {
    const regeneratedLink = regeneratedRootLinks.find(
      (link) => link.id === originalLink.id
    );
    return regeneratedLink || originalLink;
  });
};

export const areKeysSiblings = (key1: string, key2: string): boolean => {
  const segments1 = key1.split("-");
  const segments2 = key2.split("-");

  if (segments1.length !== segments2.length) {
    return false;
  }

  const parent1 = segments1.slice(0, -1).join("-");
  const parent2 = segments2.slice(0, -1).join("-");

  return parent1 === parent2;
};

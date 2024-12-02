export interface Link {
  id: string;
  key: string;
  name: string;
  url?: string;
  children?: Link[];
}

export interface ManageLinkFormValues {
  name: string;
  url?: string;
}

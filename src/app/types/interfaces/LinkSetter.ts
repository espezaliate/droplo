export interface Link {
  id: string;
  key: string;
  name: string;
  url?: string;
}

export interface ManageLinkFormValues {
  name: string;
  url?: string;
}

declare type SidebarLinks = {
  imgURL: string;
  route: string;
  label: string;
};

declare type VoiceDetails = {
  id: number;
  name: string;
};

declare type PodcastData = {
  id: number;
  title: string;
  description: string;
  imgURL: string;
};

declare type StorageResponse = {
  storageId: Id<"_storage">;
};

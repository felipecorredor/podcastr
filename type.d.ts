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
  _id: string;
  audioStorageId?: Id<"_storage">;
  user: Id<"users">;
  title: string;
  description: string;
  audioUrl?: string;
  imageUrl: string;
  imageStorageId?: Id<"_storage">;
  author: string;
  authorId: string;
  authorImageUrl: string;
  voicePrompt: string;
  imagePrompt: string;
  voiceType: string;
  audioDuration: number;
  views: number;
};

declare type StorageResponse = {
  storageId: Id<"_storage">;
};

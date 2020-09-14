export interface Show {
  id: number;
  title: string;
  description: string;
  genres: string[];
  images: {
    poster: string;
  };
  status: "Ended" | "Continuing";
  dateCreation: string;
  numberOfSeasons: string;
  isFavorite: boolean;
}

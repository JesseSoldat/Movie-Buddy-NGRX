import { User } from "./user.model";
import { MovieDetails } from "./movie-details.model";

export interface FbUser {
  key: string;
  favorites: Map<string, MovieDetails>;
  user: User;
}

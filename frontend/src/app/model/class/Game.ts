export class Game {
  id: number;
  name: string;
  releaseYear: string | null;
  genres: string[];
  platforms: string[];
  rating: number | null;
  ratingsCount: number;
  backgroundImage: string;
  screenshots: string[];
  stores: { name: string; url: string }[];
  playtime: number | null;

  constructor(data: any) {
    this.id = data?.id ?? 0; 
    this.name = data?.name ?? 'Unknown';
    this.releaseYear = data?.released
      ? new Date(data.released).getFullYear().toString()
      : null;
    this.genres = data?.genres?.map((genre: any) => genre.name) ?? [];
    this.platforms =
      data?.platforms?.map((platform: any) => platform.platform?.name) ?? [];
    this.rating = data?.rating ?? null;
    this.ratingsCount = data?.ratings_count ?? 0;
    this.backgroundImage = data?.background_image ?? '';
    this.screenshots =
      data?.short_screenshots?.map((screenshot: any) => screenshot.image) ?? [];
    this.stores =
      data?.stores?.map((store: any) => ({
        name: store.store?.name ?? 'Unknown',
        url: store.store?.domain ? `https://${store.store.domain}` : '',
      })) ?? [];
    this.playtime = data?.playtime ?? null;
  }
}

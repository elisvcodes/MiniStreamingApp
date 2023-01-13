export interface Asset {
  url: string;
  width: number;
  height: number;
}

export interface Video {
  hashed_id: string;
  name: string;
  thumbnail: {
    url: string;
  };
  duration: number;
  assets: Asset[];
}

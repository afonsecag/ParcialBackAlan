export class CreateAlbumDto {
    name: string;
    cover: string;
    releaseDate: Date;
    description: string;
  }
  
  export class UpdateAlbumDto {
    name?: string;
    cover?: string;
    releaseDate?: Date;
    description?: string;
  }
  
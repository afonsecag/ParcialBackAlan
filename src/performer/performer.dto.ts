export class CreatePerformerDto {
    name: string;
    image: string;
    description: string;
  }
  
  export class UpdatePerformerDto {
    name?: string;
    image?: string;
    description?: string;
  }
  
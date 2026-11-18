export interface Product {
  id: number;
  titulo: string;
  autor: string;
  tecnologia: string;
  enlace_comic: string;
  enlace_teaser: string;
  enlace_video: string;
  imagen: string;
  total_me_gusta: number;
  total_resenas: number;
  created_at?: string;
}
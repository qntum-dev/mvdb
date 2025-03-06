export interface Movies {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export interface Persons {
    page: number
    results: Person[]
    total_pages: number
    total_results: number
}

export interface Shows {
    page: number
    results: Show[]
    total_pages: number
    total_results: number
}

export interface Movie {
    backdrop_path: string
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    adult: boolean
    original_language: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface Show {
    backdrop_path: string
    id: number
    name: string
    original_name: string
    overview: string
    poster_path: string
    media_type: string
    adult: boolean
    original_language: string
    genre_ids: number[]
    popularity: number
    first_air_date: string
    vote_average: number
    vote_count: number
    origin_country: string[]
  }
  

export interface Person {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    known_for: KnownFor[]
  }

export interface KnownFor extends Movie{
    name?: string
    original_name?: string
    first_air_date?: string
    origin_country?: string[]
}

export interface MovieDetails {
    adult: boolean
    backdrop_path: string
    // belongs_to_collection: any
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface Genre {
    id: number
    name: string
  }
  
  export interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
  }
  
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }
  
  export interface Images {
    backdrops: Image[]
    id: number
    logos: Image[]
    posters: Image[]
  }
  
  export interface Image {
    aspect_ratio: number
    height: number
    iso_639_1?: string
    file_path: string
    vote_average: number
    vote_count: number
    width: number
  }

  export interface Videos {
    id: number
    results: Video[]
  }
  
  export interface Video {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
  }
  
  export interface Credits {
    id: number
    cast: Cast[]
    crew: Crew[]
  }
  
  export interface Cast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    cast_id: number
    character: string
    credit_id: string
    order: number
  }
  
  export interface Crew {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    credit_id: string
    department: string
    job: string
  }
  
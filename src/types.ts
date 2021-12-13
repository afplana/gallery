export type UserInfo = {
      id: string,
      username: string,
      name: string,
      portfolio_url: string,
      bio: string,
      location: string,
      total_likes: number,
      total_photos: number,
      total_collections: number,
      instagram_username: string,
      twitter_username: string,
      profile_image: {
        small: string,
        medium: string,
        large: string
      },
      links: {
        self: string,
        html: string,
        photos: string,
        likes: string,
        portfolio: string
      }
}

export type PhotoCollection = {
    id: number,
    title: string,
    published_at: Date,
    last_collected_at: Date,
    updated_at: Date,
    cover_photo: PhotoInfo | null,
    user: UserInfo | null
}

export type PhotoInfo = {
    id: string,
    created_at: Date,
    updated_at: Date,
    width: number,
    height: number,
    color: string,
    blur_hash: string,
    likes: number,
    liked_by_user: boolean,
    description: string,
    user: UserInfo,
    current_user_collections: PhotoCollection[],
    urls: {
      raw: string,
      full: string,
      regular: string,
      small: string,
      thumb: string
    },
    links: {
      self: string,
      html: string,
      download: string,
      download_location: string
    }
  }
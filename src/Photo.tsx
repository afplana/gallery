import { FC } from "react"

interface Props {
    urls: { regular: string }
    description: string
    likes: number
    user: { name: string, portfolio_url: string, profile_image: { medium: string } }
}

const Photo: FC<Props> = ({
    urls: { regular },
    description,
    likes, user: { name, portfolio_url, profile_image: { medium } }
}) => {
    return <article className="photo">
        <img src={regular} alt={description} />
        <div className="photo-info">
            <div>
                <h4>{name}</h4>
                <p>{likes} likes</p>
            </div>
            <a href={portfolio_url}>
                <img src={medium} alt={name} className="user-img" />
            </a>
        </div>
    </article>
}

export default Photo
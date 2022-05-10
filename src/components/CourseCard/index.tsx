import { Link, useParams } from "react-router-dom";

interface Props {
  avatar: string;
  title: string;
  description: string;
  id: string;
}

export function CourseCard(props: Props) {
  const { avatar, title, description, id } = props;

  return (
    <Link to={`/courses/${id}`} className="link link--black">
      <div className="card">
        <img className="card_image" src={avatar} alt="Изображение курса" />
        <div className="card_body">
          <header className="card_title">{title}</header>
          <p className="card_description">{description}</p>
        </div>
      </div>
    </Link>
  );
}

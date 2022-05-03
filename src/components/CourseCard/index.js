import React from "react";
import { Link } from "react-router";

const CourseCard = (props) => {
  return (
    <Link to={`courses/${props.id}`} className="link link--black">
      <div className="card">
        <img
          className="card_image"
          src={props.avatar}
          alt="Изображение курса"
        />
        <div className="card_body">
          <header className="card_title">{props.title}</header>
          <p className="card_description">{props.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

import { useState, useEffect, SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import lection from "./lection.svg";
import test from "./test.svg";
import video from "./video.svg";
import type { CourseItem } from "../../types/Course";

export function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [alert, setAlert] = useState("");
  const [statistics, setStatistics] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    fetch("/course_" + id + ".json")
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      });

    fetch(`${API_URL}/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsParticipating(data.participanting);
      });

    fetch(`${API_URL}/api/courses/${id}/participants/${userId}/statistics`)
      .then((res) => res.json())
      .then((data) => {
        const courseStatistics = Math.round(
          (data.data.solved_problems / data.data.problems) * 100
        );

        setStatistics(courseStatistics);
      });
  }, []);

  const renderItem = (item: CourseItem) => {
    return (
      <div key={item.id} className="col-md-4 mt-3">
        <div className="card">
          <div className="card-block">
            <h3 className="card-title">{item.title}</h3>
            {/* <p className="card-text">{item.serial_number}</p> */}
            <Link
              to={`/courses/${id}/contents/${item.id}`}
              className="btn btn-success"
            >
              Просмотреть
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const joinCourse = () => {};

  const leaveCourse = () => {};

  const checkAccessToContent = (event: SyntheticEvent) => {
    if (!isParticipating) {
      event.preventDefault();
      setAlert("Вы не подписаны на курс");
    }
  };
  const joinButton = isParticipating ? (
    <button className="button mb-16" onClick={leaveCourse}>
      Отписаться
    </button>
  ) : (
    <button className="button mb-16" onClick={joinCourse}>
      Подписаться
    </button>
  );

  const Alert = alert ? (
    <div className="alert alert-warning">{alert}</div>
  ) : null;

  const passStatistics = statistics ? (
    isParticipating ? (
      <p>
        <>Курс пройден на {statistics}%</>
      </p>
    ) : null
  ) : null;

  if (!course) {
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="panel h-600">
            <img
              src={course.avatar}
              className="course-img mb-24"
              alt="Изображние курса"
              width="350px"
              height="200px"
            />
            <div className="mx-32">
              {passStatistics}
              {joinButton}
              {Alert}
              <p className="mb-16 fs-20">{course.description}</p>
              <p className="mb-8">
                Автор: {course.owner.firstName} {course.owner.lastName}
              </p>
              <p className="mb-8">Дата создания: {course.createdAt}</p>
              <p className="mb-0">Теги: #programming #database</p>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="panel h-600">
            <header className="ml-32 mt-24 fs-24 mb-20">{course.title}</header>

            {course.lectures.map((lecture) => {
              return (
                <div className="mb-16" key={lecture.id}>
                  <p className="fs-20 mx-32 mb-0">{lecture.title}</p>
                  <hr className="hr mx-32  my-4" />
                  {lecture.content.map((content) => {
                    const contentIcon =
                      content.type === "MarkdownContent" ? lection : test;
                    return (
                      <Link
                        to={`/courses/${id}/lectures/${lecture.id}/contents/${content.id}`}
                        className="link"
                        onClick={checkAccessToContent}
                      >
                        <div className="mx-32 list-item" key={content.id}>
                          {/* {state.solvedIds.indexOf(content.id) >= 0 &&
                            state.participating && (
                              <span className="circle circle--green ml-8 mr-16" />
                            )}
                          {state.solvedIds.indexOf(content.id) === -1 &&
                            state.participating && (
                              <span className="circle ml-8 mr-16" />
                            )} */}
                          <img
                            src={contentIcon}
                            className="mr-16"
                            alt="Иконка контента"
                          />
                          {content.title}
                          {/* {state.solvedIds.indexOf(content.id) >= 0 &&
                            state.participating && (
                              <span
                                className="ml-16 fs-12"
                                style={{ fontWeight: "200", color: "gray" }}
                              >
                                Пройдено
                              </span>
                            )} */}
                          <hr className="hr my-4" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

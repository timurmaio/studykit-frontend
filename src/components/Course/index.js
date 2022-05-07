import React, { Component, useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { API_URL, createAxios } from "../../config";
import lection from "./lection.svg";
import test from "./test.svg";
import video from "./video.svg";

function Course() {
  const { id } = useParams();
  const [state, setState] = useState({
    id: "",
    title: "",
    description: "",
    content: [],
    course: {},
    owner: {},
    createdAt: "",
    participating: false,
    statistics: "",
    alert: "",
  });

  useEffect(() => {
    const axios = createAxios();
    const userId = localStorage.getItem("user_id");

    // TODO: api
    axios.get("/course_" + id + ".json").then((response) => {
      setState({
        ...state,
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        content: response.data.lectures,
        course: response.data,
        owner: response.data.owner,
        solvedIds: response.data.solvedIds,
        createdAt: response.data.createdAt,
      });
    });

    axios.get(API_URL + "/api/courses/" + id).then((response) => {
      console.log(response.data);
      setState({
        ...state,
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        content: response.data.lectures,
        course: response.data,
        owner: response.data.owner,
        solvedIds: response.data.solvedIds,
        createdAt: response.data.createdAt,
      });
    });

    axios
      .get(`${API_URL}/api/courses/${id}/participating `)
      .then((response) => {
        setState({ ...state, participating: response.data.participating });
        console.log(response.data);
      });

    axios
      .get(`${API_URL}/api/courses/${id}/participants/${userId}/statistics`)
      .then((response) => {
        const courseStatistics = Math.round(
          (response.data.data.solved_problems / response.data.data.problems) *
            100
        );
        // console.log(courseStatistics)

        setState({ ...state, statistics: courseStatistics });
        console.log(response.data);
      });
  }, []);

  const renderItem = (item) => {
    return (
      <div key={item.id} className="col-md-4 mt-3">
        <div className="card">
          <div className="card-block">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-text">{item.serial_number}</p>
            <Link
              to={`/courses/${state.courseId}/contents/${item.id}`}
              className="btn btn-success"
            >
              Просмотреть
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const joinCourse = () => {
    const axios = createAxios();

    axios.post(`${API_URL}/api/courses/${id}/join`).then((response) => {
      if (response.status === 200) {
        setState({ alert: response.data.data, participating: true });
      }
      console.log(response.data);
    });
  };

  const leaveCourse = () => {
    const axios = createAxios();

    axios.delete(`${API_URL}/api/courses/${id}/leave `).then((response) => {
      if (response.status === 200) {
        setState({ alert: response.data.data, participating: false });
      }
      console.log(response.data);
    });
  };

  const checkAccessToContent = (event) => {
    if (!state.participating) {
      event.preventDefault();
      setState({ ...state, alert: "Вы не подписаны на курс" });
    }
  };
  const joinButton = state.participating ? (
    <button className="button mb-16" onClick={leaveCourse}>
      Отписаться
    </button>
  ) : (
    <button className="button mb-16" onClick={joinCourse}>
      Подписаться
    </button>
  );

  const alert = state.alert ? (
    <div className="alert alert-warning">{state.alert}</div>
  ) : null;

  const passStatistics = state.statistics ? (
    state.participating ? (
      <p>Курс пройден на {state.statistics}%</p>
    ) : null
  ) : null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="panel h-600">
            <img
              src={state.course.avatar}
              className="course-img mb-24"
              alt="Изображние курса"
              width="350px"
              height="200px"
            />
            <div className="mx-32">
              {passStatistics}
              {joinButton}
              {alert}
              <p className="mb-16 fs-20">{state.description}</p>
              <p className="mb-8">
                Автор: {state.owner.firstName} {state.owner.lastName}
              </p>
              <p className="mb-8">Дата создания: {state.createdAt}</p>
              <p className="mb-0">Теги: #programming #database</p>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="panel h-600">
            <header className="ml-32 mt-24 fs-24 mb-20">{state.title}</header>

            {state.content.map((lecture) => {
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
                          {state.solvedIds.indexOf(content.id) >= 0 &&
                            state.participating && (
                              <span className="circle circle--green ml-8 mr-16" />
                            )}
                          {state.solvedIds.indexOf(content.id) === -1 &&
                            state.participating && (
                              <span className="circle ml-8 mr-16" />
                            )}
                          <img
                            src={contentIcon}
                            className="mr-16"
                            alt="Иконка контента"
                          />
                          {content.title}
                          {state.solvedIds.indexOf(content.id) >= 0 &&
                            state.participating && (
                              <span
                                className="ml-16 fs-12"
                                style={{ fontWeight: "200", color: "gray" }}
                              >
                                Пройдено
                              </span>
                            )}
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

export default Course;

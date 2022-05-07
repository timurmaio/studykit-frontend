import React, { Component } from "react";
import { Link } from "react-router";
import { API_URL, createAxios } from "../../config";
import lection from "./lection.svg";
import test from "./test.svg";
import video from "./video.svg";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  componentDidMount() {
    const axios = createAxios();
    const userId = localStorage.getItem("user_id");

    // TODO: api
    axios.get("/course_" + this.props.params.id + ".json").then((response) => {
      this.setState({
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
      .get(API_URL + "/api/courses/" + this.props.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
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
      .get(`${API_URL}/api/courses/${this.props.params.id}/participating `)
      .then((response) => {
        this.setState({ participating: response.data.participating });
        console.log(response.data);
      });

    axios
      .get(
        `${API_URL}/api/courses/${this.props.params.id}/participants/${userId}/statistics`
      )
      .then((response) => {
        const courseStatistics = Math.round(
          (response.data.data.solved_problems / response.data.data.problems) *
            100
        );
        // console.log(courseStatistics)

        this.setState({ statistics: courseStatistics });
        console.log(response.data);
      });
  }

  renderItem = (item) => {
    return (
      <div key={item.id} className="col-md-4 mt-3">
        <div className="card">
          <div className="card-block">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-text">{item.serial_number}</p>
            <Link
              to={{
                pathname: `/courses/${this.state.courseId}/contents/${item.id}`,
              }}
              className="btn btn-success"
            >
              Просмотреть
            </Link>
          </div>
        </div>
      </div>
    );
  };

  joinCourse = () => {
    const axios = createAxios();

    axios
      .post(`${API_URL}/api/courses/${this.props.params.id}/join`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ alert: response.data.data, participating: true });
        }
        console.log(response.data);
      });
  };

  leaveCourse = () => {
    const axios = createAxios();

    axios
      .delete(`${API_URL}/api/courses/${this.props.params.id}/leave `)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ alert: response.data.data, participating: false });
        }
        console.log(response.data);
      });
  };

  checkAccessToContent = (event) => {
    if (!this.state.participating) {
      event.preventDefault();
      this.setState({ alert: "Вы не подписаны на курс" });
    }
  };

  render() {
    const joinButton = this.state.participating ? (
      <button className="button mb-16" onClick={this.leaveCourse}>
        Отписаться
      </button>
    ) : (
      <button className="button mb-16" onClick={this.joinCourse}>
        Подписаться
      </button>
    );

    const alert = this.state.alert ? (
      <div className="alert alert-warning">{this.state.alert}</div>
    ) : null;

    const passStatistics = this.state.statistics ? (
      this.state.participating ? (
        <p>Курс пройден на {this.state.statistics}%</p>
      ) : null
    ) : null;

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="panel h-600">
              <img
                src={this.state.course.avatar}
                className="course-img mb-24"
                alt="Изображние курса"
                width="350px"
                height="200px"
              />
              <div className="mx-32">
                {passStatistics}
                {joinButton}
                {alert}
                <p className="mb-16 fs-20">{this.state.description}</p>
                <p className="mb-8">
                  Автор: {this.state.owner.firstName}{" "}
                  {this.state.owner.lastName}
                </p>
                <p className="mb-8">Дата создания: {this.state.createdAt}</p>
                <p className="mb-0">Теги: #programming #database</p>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="panel h-600">
              <header className="ml-32 mt-24 fs-24 mb-20">
                {this.state.title}
              </header>

              {this.state.content.map((lecture) => {
                return (
                  <div className="mb-16" key={lecture.id}>
                    <p className="fs-20 mx-32 mb-0">{lecture.title}</p>
                    <hr className="hr mx-32  my-4" />
                    {lecture.content.map((content) => {
                      const contentIcon =
                        content.type === "MarkdownContent" ? lection : test;
                      return (
                        <Link
                          to={`/courses/${this.props.params.id}/lectures/${lecture.id}/contents/${content.id}`}
                          className="link"
                          onClick={this.checkAccessToContent}
                        >
                          <div className="mx-32 list-item" key={content.id}>
                            {this.state.solvedIds.indexOf(content.id) >= 0 &&
                              this.state.participating && (
                                <span className="circle circle--green ml-8 mr-16" />
                              )}
                            {this.state.solvedIds.indexOf(content.id) === -1 &&
                              this.state.participating && (
                                <span className="circle ml-8 mr-16" />
                              )}
                            <img
                              src={contentIcon}
                              className="mr-16"
                              alt="Иконка контента"
                            />
                            {content.title}
                            {this.state.solvedIds.indexOf(content.id) >= 0 &&
                              this.state.participating && (
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
}

export default Course;

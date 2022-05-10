import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { API_URL } from "../../config";
import arrow from "./arrow-back.svg";
import lection from "./lection.svg";
import test from "./test.svg";
import { CourseItem, LectureContent } from "../../types/Course";

export function ShowContent() {
  const { id, lectureId, contentId } = useParams();
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [content, setContent] = useState<LectureContent | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [statistics, setStatistics] = useState(0);
  const [textAreaInput, setTextAreaInput] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    fetch(`${API_URL}/api/lectures/${lectureId}/content/${contentId}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
      });

    fetch("/course_" + id + ".json")
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      });

    // fetch(API_URL + "/api/courses/" + id).then((res) => res.json()).then((data) => {
    //   setCourse(data);
    // });

    fetch(`${API_URL}/api/lectures/${lectureId}/content/${contentId}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
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

  const handleTextareaChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    setTextAreaInput(value);
  };

  // const checkTheSolution = (event) => {
  //   event.preventDefault();

  //   const axios = createAxios();

  //   this.setState({ alert: "" });

  //   const url = `${API_URL}/api/sql_solutions`;

  //   let data = {
  //     sql_solution: {
  //       sql_problem_id: this.state.contentId,
  //       code: this.state.solution,
  //     },
  //   };

  //   axios
  //     .post(url, data)
  //     .then((response) => {
  //       if (response.status === 201) {
  //         const solutionId = response.data.id;
  //         this.setState({
  //           checkingInformation: "Идёт проверка...",
  //           succeed: null,
  //         });

  //         const waitingForSoluition = setInterval(() => {
  //           axios
  //             .get(`${API_URL}/api/sql_solutions/${solutionId}`)
  //             .then((response) => {
  //               if (response.data.succeed === true) {
  //                 this.setState({
  //                   checkingInformation: "Решение верно!",
  //                   succeed: true,
  //                 });
  //                 clearInterval(waitingForSoluition);
  //               } else if (response.data.succeed === false) {
  //                 this.setState({
  //                   checkingInformation: "Решение неверно, попробуйте ещё раз!",
  //                   succeed: false,
  //                 });
  //                 clearInterval(waitingForSoluition);
  //               }
  //             });
  //         }, 1000);
  //       }
  //     })
  //     .catch((error) => {
  //       const errorText = error.response.data.errors[0];
  //       setAlert(errorText);
  //     });
  // };

  // const alert = this.state.alert ? (
  //   <div className="alert alert-danger">{this.state.alert}</div>
  // ) : null;

  // let alertType;

  // switch (this.state.succeed) {
  //   case true:
  //     alertType = "alert-success";
  //     break;

  //   case false:
  //     alertType = "alert-danger";
  //     break;

  //   default:
  //     alertType = "alert-info";
  // }

  // const checkingInformation = this.state.checkingInformation ? (
  //   <div className={`alert ${alertType}`}>
  //     {this.state.checkingInformation}
  //   </div>
  // ) : null;

  const passStatistics = statistics ? (
    isParticipating ? (
      <p>Курс пройден на {statistics}%</p>
    ) : null
  ) : null;

  if (!course) {
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <div className="panel h-600">
            <div className="mx-16 mt-24">
              <Link to={`/courses/${id}`} className="link flex mb-16">
                <img src={arrow} alt="" className="mr-12" />
                Вернуться к курсу
              </Link>
              <header className="fs-24 mb-20">{course.title}</header>

              {passStatistics}

              {course.lectures.map((lecture) => {
                return (
                  <div className="mb-16" key={lecture.id}>
                    <p className="fs-20 mb-0">{lecture.title}</p>
                    <hr className="hr my-4" />

                    {lecture.content.map((content) => {
                      const contentIcon =
                        content.type === "MarkdownContent" ? lection : test;
                      return (
                        <Link
                          to={`/courses/${id}/lectures/${lecture.id}/contents/${content.id}`}
                          className="link"
                          key={content.id}
                        >
                          <div className="list-item flex align-items-center">
                            {/* {this.state.solvedIds.indexOf(content.id) >= 0 &&
                                this.state.participating && (
                                  <span className="circle circle--green ml-8 mr-16" />
                                )}
                              {this.state.solvedIds.indexOf(content.id) ===
                                -1 &&
                                this.state.participating && (
                                  <span className="circle ml-8 mr-16" />
                                )} */}
                            <img
                              src={contentIcon}
                              className="mr-16"
                              alt="Иконка контента"
                            />
                            <div style={{ display: "block" }}>
                              {content.title}
                            </div>
                            {/* {this.state.solvedIds.indexOf(content.id) >= 0 &&
                                this.state.participating && (
                                  <div
                                    className="ml-16 fs-12"
                                    style={{ fontWeight: "200", color: "gray" }}
                                  >
                                    Пройдено
                                  </div>
                                )} */}
                          </div>
                          <hr className="hr my-4" />
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="panel h-600">
            <header className="ml-32 mt-24 fs-24 mb-20">{course.title}</header>
            {/* <ReactMarkdown
                className="mx-32"
                source={course.description}
              /> */}
            <div className="form-group mx-32">
              {/* {this.state.type !== "MarkdownContent" && (
                  <form>
                    <label htmlFor="exampleTextarea">
                      Введите сюда своё решение
                    </label>
                    <textarea
                      className="form-control mb-16"
                      name="solution"
                      id="exampleTextarea"
                      rows="6"
                      onChange={this.handleTextareaChange}
                    />
                    <button
                      className="button mb-16"
                      onClick={this.checkTheSolution}
                    >
                      Отправить решение
                    </button>
                    {alert}
                    {checkingInformation}
                  </form>
                )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

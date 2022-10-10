import "./CourseCard.css";

import { Link } from "react-router-dom";

const CourseCard = ({ id, course, selected, toggleSelected, conflicts }) => {
  return (
    <div
      className={`card m-1 p-2 ${selected.includes(id) ? "selected" : ""} ${
        conflicts.includes(id) ? "conflict" : ""
      }`}
      onClick={() => !conflicts.includes(id) && toggleSelected(id)}
    >
      <div className="card-body">
        <h3 className="card-title">
          {course.term} CS {course.number}
        </h3>
        <p className="card-text">{course.title}</p>
      </div>
      <div className="align-self-bottom px-3">
        <em className="card-text">{course.meets}</em>
      </div>
      <hr className="m-1" />
      <div className="px-3 py-1 card-link">
        <Link to={id + "/edit"}>Edit</Link>
      </div>
    </div>
  );
};

export default CourseCard;

import "./CourseCard.css";

import { Link } from "react-router-dom";

const CourseCard = ({
  profile,
  id,
  course,
  selected,
  toggleSelected,
  conflicts,
}) => {
  return (
    <div
      className={`card m-1 p-2 ${selected.includes(id) ? "selected" : ""} ${
        conflicts.includes(id) ? "conflict" : ""
      }`}
      data-cy="course"
      onClick={() => !conflicts.includes(id) && toggleSelected(id)}
    >
      <div className="card-body pb-0">
        <h3 className="card-title">
          {course.term} CS {course.number}
        </h3>
        <p className="card-text">{course.title}</p>
        {profile?.isAdmin && (
          <div className="card-link">
            <Link to={id + "/edit"}>Edit</Link>
          </div>
        )}
      </div>
      <div className="align-self-bottom px-3 pb-3">
        <hr />
        <em className="card-text">{course.meets}</em>
      </div>
    </div>
  );
};

export default CourseCard;

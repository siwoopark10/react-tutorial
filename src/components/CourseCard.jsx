const CourseCard = ({ course }) => {
  return (
    <div className="card m-1 p-2">
      <div className="card-body">
        <h3 className="card-title">
          {course.term} CS {course.number}
        </h3>
        <p className="card-text">{course.title}</p>
      </div>
      <div className="align-self-bottom p-2">
        <hr />
        <p className="card-text">{course.meets}</p>
      </div>
    </div>
  );
};

export default CourseCard;

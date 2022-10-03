const CourseInfo = ({ course }) => {
  return (
    <div>
      <b>
        {course.term} CS {course.number}
      </b>
      : {course.title} | <em>{course.meets}</em>
    </div>
  );
};

const Schedule = ({ courses, selected }) => (
  <div>
    {selected.length === 0
      ? "Select course cards to add them to my schedule"
      : selected.map((courseID) => (
          <CourseInfo key={courseID} course={courses[courseID]} />
        ))}
  </div>
);

export default Schedule;

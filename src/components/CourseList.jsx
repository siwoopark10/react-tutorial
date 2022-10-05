import "./CourseList.css";

import CourseCard from "./CourseCard";

const CourseList = ({ term, courses, selected, toggleSelected, conflicts }) => {
  return (
    <div className="course-list">
      {Object.entries(courses).map(
        ([id, course]) =>
          course.term === term && (
            <CourseCard
              key={id}
              id={id}
              course={course}
              selected={selected}
              toggleSelected={toggleSelected}
              conflicts={conflicts}
            />
          )
      )}
    </div>
  );
};

export default CourseList;

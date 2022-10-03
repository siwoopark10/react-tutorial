import CourseCard from "./CourseCard";
import "./CourseList.css";

const CourseList = ({ term, courses, selected, toggleSelected }) => {
  // console.log(selected);
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
            />
          )
      )}
    </div>
  );
};

export default CourseList;

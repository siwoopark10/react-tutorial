import CourseCard from "./CourseCard";
import "./CourseList.css";

const CourseList = ({ term, courses }) => {
  return (
    <div className="course-list">
      {Object.entries(courses).map(
        ([id, course]) =>
          course.term === term && <CourseCard key={id} course={course} />
      )}
    </div>
  );
};

export default CourseList;

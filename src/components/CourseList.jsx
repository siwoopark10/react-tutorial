import CourseCard from './CourseCard'

const CourseList = ({ courses }) => {
  return (
    <div>
      {Object.entries(courses).map(([id, course]) => (
        <CourseCard key={id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;

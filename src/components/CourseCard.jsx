const CourseCard = ({ course }) => {
  return (
    <p>
      {course.term} CS {course.number}: {course.title}
    </p>
  );
};

export default CourseCard;

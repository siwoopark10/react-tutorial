import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

export default function CourseEdit({ courses }) {
  let { id } = useParams();
  const course = courses[id];
  return (
    <Form className="m-5">
      <h1>
        {course.term} CS {course.number}
      </h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Course Name</Form.Label>
        <Form.Control defaultValue={course.title} placeholder={course.title} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Course Meeting Times</Form.Label>
        <Form.Control defaultValue={course.meets} placeholder={course.meets} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

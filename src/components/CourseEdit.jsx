import { Link, useNavigate, useParams } from "react-router-dom";
import { useDbData, useDbUpdate } from "../utilities/firebase";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormData } from "../utilities/useFormData";

const validateUserData = (key, val) => {
  switch (key) {
    case "courseTitle":
      return /(^\w\w)/.test(val) ? "" : "must be least two characters";
    case "courseMeets":
      return /^(M|Tu|W|Th|F)+ (([01]?[0-9]|2[0-3]):[0-5][0-9])-(([01]?[0-9]|2[0-3]):[0-5][0-9])$/.test(
        val
      )
        ? ""
        : "must contain days and start-end, e.g., MWF 12:00-13:20";
    default:
      return "";
  }
};

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <Form.Label htmlFor={name}>{text}</Form.Label>
    <Form.Control
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    />
    <Form.Control.Feedback type="invalid">
      {state.errors?.[name]}
    </Form.Control.Feedback>
  </div>
);

const ButtonBar = ({ message, disabled }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>
        Return to Home Page
      </Button>
      <Button
        variant="primary"
        className="me-auto"
        disabled={disabled}
        type="submit"
      >
        Submit
      </Button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const CourseEdit = ({ data }) => {
  if (data != null) {
    let { id } = useParams();
    const course = data.courses[id];

    const [update, result] = useDbUpdate(`/courses/${id}`);
    const [state, change] = useFormData(validateUserData, {
      courseTitle: course.title,
      courseMeets: course.meets,
    });

    const handleSubmmit = (evt) => {
      evt.preventDefault();
      update(state.values);
    };

    return (
      <Form
        onSubmit={handleSubmmit}
        noValidate
        className={`m-5 my-3 ${state.errors ? "was-validated" : null}`}
      >
        <h2>
          {course.term} CS {course.number}
        </h2>
        <InputField
          name="courseTitle"
          text="Course Title"
          state={state}
          change={change}
        />
        <InputField
          name="courseMeets"
          text="Course Schedule"
          state={state}
          change={change}
        />
        <ButtonBar message={result?.message} disabled={state.errors} />
      </Form>
    );
  }
};

export default CourseEdit;

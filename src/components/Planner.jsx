import { addConflicts, removeConflicts } from "../utilities/conflict";

import Banner from "./Banner";
import CourseList from "./CourseList";
import Schedule from "./Schedule";
import SelectedModal from "./SelectedModal";
import TermSelector from "./TermSelector";
import { useJsonQuery } from "../utilities/fetch";
import { useState } from "react";

const Planner = () => {
  const [selection, setSelection] = useState("Fall");
  const [selected, setSelected] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const url =
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";
  const [data, isLoading, error] = useJsonQuery([url]);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  const toggleSelected = (course) => {
    if (selected.includes(course)) {
      let newSelected = selected.filter((x) => x !== course);
      setConflicts(() =>
        removeConflicts(conflicts, newSelected, course, data.courses)
      );
      setSelected(newSelected);
    } else {
      setConflicts(() =>
        addConflicts(conflicts, course, selected, data.courses)
      );
      setSelected([...selected, course]);
    }
  };

  return (
    <div className="m-3 mx-5">
      <Banner title={data.title} />
      <SelectedModal open={open} close={closeModal}>
        <Schedule courses={data.courses} selected={selected} />
      </SelectedModal>
      <div className="d-flex">
        <TermSelector selection={selection} setSelection={setSelection} />
        <button
          className="btn btn-outline-dark ms-auto m-2"
          onClick={openModal}
        >
          <i className="bi bi-calendar"></i>
        </button>
      </div>
      <CourseList
        term={selection}
        courses={data.courses}
        selected={selected}
        toggleSelected={toggleSelected}
        conflicts={conflicts}
      />
    </div>
  );
};

export default Planner;

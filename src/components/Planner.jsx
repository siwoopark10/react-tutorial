import { addConflicts, removeConflicts } from "../utilities/conflict";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

import Banner from "./Banner";
import CourseList from "./CourseList";
import { NavLink } from "react-router-dom";
import Schedule from "./Schedule";
import SelectedModal from "./SelectedModal";
import TermSelector from "./TermSelector";
import { useState } from "react";

const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>
    Sign out
  </button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const activation = ({ isActive }) => (isActive ? "active" : "inactive");

const Planner = ({ data }) => {
  if (data != null) {
    const [selection, setSelection] = useState("Fall");
    const [selected, setSelected] = useState([]);
    const [conflicts, setConflicts] = useState([]);
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

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
        <div className="d-flex">
          <Banner title={data.title} />
          <AuthButton />
        </div>
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
  }
};

export default Planner;

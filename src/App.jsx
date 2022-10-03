import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import Schedule from "./components/Schedule";
import SelectedModal from "./components/SelectedModal";
import TermSelector from "./components/TermSelector";
import { useJsonQuery } from "./utilities/fetch";
import { useState } from "react";

export default function App() {
  const queryClient = new QueryClient();
  const [selection, setSelection] = useState("Fall");
  const [selected, setSelected] = useState([]);
  const toggleSelected = (course) =>
    setSelected(
      selected.includes(course)
        ? selected.filter((x) => x !== course)
        : [...selected, course]
    );
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const Main = () => {
    const [data, isLoading, error] = useJsonQuery([
      "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php",
    ]);

    if (error) return <h1>Error loading user data: {`${error}`}</h1>;
    if (isLoading) return <h1>Loading user data...</h1>;
    if (!data) return <h1>No user data found</h1>;
    console.log(selected);

    return (
      <div className="m-3">
        <Banner title={data.title} />
        <SelectedModal open={open} close={closeModal}>
          <Schedule courses={data.courses} selected={selected} />
        </SelectedModal>
        <div className="d-flex p-2">
          <TermSelector selection={selection} setSelection={setSelection} />
          <button className="btn btn-outline-dark ms-auto" onClick={openModal}>
            <i className="bi bi-calendar"></i>
          </button>
        </div>
        <CourseList
          term={selection}
          courses={data.courses}
          selected={selected}
          toggleSelected={toggleSelected}
        />
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

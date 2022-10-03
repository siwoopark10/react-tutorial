import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import TermSelector from "./components/TermSelector"

import { useJsonQuery } from "./utilities/fetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function App() {
  const [selection, setSelection] = useState("Fall");
  const [selected, setSelected] = useState([])
  const toggleSelected = (course) => setSelected(
    selected.includes(course)
    ? selected.filter(x => x !== course)
    : [...selected, course]
  )

  const Main = () => {
    const [data, isLoading, error] = useJsonQuery([
      "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php",
    ]);

    if (error) return <h1>Error loading user data: {`${error}`}</h1>;
    if (isLoading) return <h1>Loading user data...</h1>;
    if (!data) return <h1>No user data found</h1>;

    return (
      <div className="m-3">
        <Banner title={data.title} />
        <TermSelector selection={selection} setSelection={setSelection} />
        <CourseList term={selection} courses={data.courses} selected={selected} toggleSelected={toggleSelected} />
      </div>
    );
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Main/>
    </QueryClientProvider>
  );
}

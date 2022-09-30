import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import { useJsonQuery } from "./utilities/fetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function App() {
  const terms = ["Fall", "Winter", "Spring"];
  const [selection, setSelection] = useState("Fall");

  const TermButton = ({ term, selection, setSelection }) => (
    <div>
      <input
        type="radio"
        id={term}
        className="btn-check"
        checked={term === selection}
        autoComplete="off"
        onChange={() => setSelection(term)}
      />
      <label className="btn btn-success mb-1 p-2" htmlFor={term}>
        {term}
      </label>
    </div>
  );

  const TermSelector = ({ selection, setSelection }) => (
    <div className="btn-group">
      {terms.map((term) => (
        <TermButton
          key={term}
          term={term}
          selection={selection}
          setSelection={setSelection}
        />
      ))}
    </div>
  );

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
        <CourseList term={selection} courses={data.courses} />
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

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import CourseEdit from "./components/CourseEdit";
import Planner from "./components/Planner";
import { useJsonQuery } from "./utilities/fetch";

export default function App() {
  const url =
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";
  const [data, isLoading, error] = useJsonQuery([url]);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Planner data={data} />} />
        <Route
          path="/:id/edit"
          element={<CourseEdit courses={data.courses} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

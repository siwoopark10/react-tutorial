import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { database, useDbData } from "./utilities/firebase";
import { get, ref } from "firebase/database";

import CourseEdit from "./components/CourseEdit";
import Planner from "./components/Planner";
import { useJsonQuery } from "./utilities/fetch";
import { useState } from "react";

export default function App() {
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading user data: {`${error.toString()}`}</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Planner data={data} />} />
        <Route path="/:id/edit" element={<CourseEdit data={data} />} />
      </Routes>
    </BrowserRouter>
  );
}

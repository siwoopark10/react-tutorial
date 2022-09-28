import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import { useJsonQuery } from "./utilities/fetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Main = () => {
  const [data, isLoading, error] = useJsonQuery([
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php",
  ]);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;
  return (
    <div>
      <Banner title={data.title} />
      <CourseList courses={data.courses} />
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Main />
      </div>
    </QueryClientProvider>
  );
};

export default App;

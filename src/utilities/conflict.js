const parseMeets = (meets) => {
  let [days, time] = meets.split(" ");
  days = days.split(/(?=[A-Z])/);
  let [start, end] = time.split("-");
  let [hour, min] = start.split(":");
  let s = parseInt(hour) * 60 + parseInt(min);
  let [hour2, min2] = end.split(":");
  let e = parseInt(hour2) * 60 + parseInt(min2);
  return [days, s, e];
};

const parseCourse = (course) => [course.term].concat(parseMeets(course.meets));

const termsConflict = (t1, t2) => t1 === t2;

const daysConflict = (d1, d2) => d1.some((d) => d2.includes(d));

const hoursConflict = (s1, e1, s2, e2) =>
  (s1 >= s2 && s1 <= e2) || (e1 >= s2 && e1 <= e2) || (s1 <= s2 && e1 >= e2);

// returns true if conflict
const twoCoursesConflict = (course1, course2) => {
  let [term, days, start, end] = parseCourse(course1);
  let [term2, days2, start2, end2] = parseCourse(course2);
  return (
    termsConflict(term, term2) &&
    daysConflict(days, days2) &&
    hoursConflict(start, end, start2, end2)
  );
};

export const removeConflicts = (
  conflicts,
  newSelected,
  removedSelection,
  courses
) =>
  conflicts.filter(
    (conflict) =>
      !twoCoursesConflict(courses[removedSelection], courses[conflict]) &&
      newSelected.some((selectedCourse) =>
        twoCoursesConflict(courses[conflict], courses[selectedCourse])
      )
  );

export const addConflicts = (conflicts, newCourse, selected, courses) => {
  const newConflicts = [];
  for (const [id, course] of Object.entries(courses)) {
    if (conflicts.includes(id) || selected.includes(id) || id === newCourse) {
      continue;
    }
    if (twoCoursesConflict(courses[newCourse], courses[id])) {
      newConflicts.push(id);
    }
  }
  return conflicts.concat(newConflicts);
};

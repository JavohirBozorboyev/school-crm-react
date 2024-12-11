import { useState } from "react";
import StudentPageNav from "../../module/StudentsPageSection/StudentPageNav";
import StudentPageTable from "../../module/StudentsPageSection/StudentPageTable";

const StudentsPage = () => {
  const [filter, setFilter] = useState({
    search: "",
    status: "active",
  });

  return (
    <div>
      <StudentPageNav filter={filter} setFilter={setFilter} />
      <StudentPageTable filter={filter} />
    </div>
  );
};

export default StudentsPage;

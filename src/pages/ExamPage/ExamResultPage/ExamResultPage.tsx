import { useState } from "react";
import ExamResultPageList from "../../../module/ExamPageSection/ExamResultPageList";
import ExamResultPageNav from "../../../module/ExamPageSection/ExamResultPageNav";

const ExamResultPage = () => {
  const [search, setSearch] = useState({
    search: "",
    active: "active",
  });
  return (
    <div>
      <ExamResultPageNav search={search} setSearch={setSearch} />
      <ExamResultPageList search={search.search} active={search.active} />
    </div>
  );
};

export default ExamResultPage;

import { useState } from "react";
import ExamResultPageNav from "../../module/ExamPageSection/ExamResultPageNav";
import ExamResultPageList from "../../module/ExamPageSection/ExamResultPageList";

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

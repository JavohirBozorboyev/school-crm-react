import { useState } from "react";
import ExamPageList from "../../module/ExamPageSection/ExamPageList";
import ExamPageNav from "../../module/ExamPageSection/ExamPageNav";

const ExamPage = () => {
  const [search, setSearch] = useState({
    search: "",
    active: "active",
  });
  return (
    <div>
      <ExamPageNav search={search} setSearch={setSearch} />
      <ExamPageList search={search.search} active={search.active} />
    </div>
  );
};

export default ExamPage;

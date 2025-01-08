import { useParams } from "react-router-dom";
import useSWR from "swr";
import ExamResultIdPageTable from "../../../../module/ExamPageSection/ExamResultIdPageSection/ExamResultIdPageTable";
import ExamResultIdPageNav from "../../../../module/ExamPageSection/ExamResultIdPageSection/ExamResultIdPageNav";
import ExamResultIdGradeTable from "../../../../module/ExamPageSection/ExamResultIdPageSection/ExamResultIdGradeTable";
import { useState } from "react";

const ExamResultIdPage = () => {
  const { slug, id } = useParams();
  const [segment, setSegment] = useState("/grade");
  const { data, error, isLoading } = useSWR(`/api/exam/exam-results/${slug}`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  const group = data?.group?.find(
    (el: { groupInfo: { _id: string } }) => el.groupInfo._id === id
  );

  return (
    <div>
      <ExamResultIdPageNav
        group={group}
        setSegment={setSegment}
        segment={segment}
      />
      {segment === "/exam" && <ExamResultIdPageTable group={group} />}
      {segment === "/grade" && <ExamResultIdGradeTable />}
    </div>
  );
};

export default ExamResultIdPage;

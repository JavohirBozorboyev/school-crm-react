import { useParams } from "react-router-dom";
import useSWR from "swr";
import ExamResultIdPageTable from "../../../../module/ExamPageSection/ExamResultIdPageSection/ExamResultIdPageTable";

const ExamResultIdPage = () => {
  const { slug, id } = useParams();
  const { data, error, isLoading } = useSWR(`/api/exam/exam-results/${slug}`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;
  const group = data?.group?.find(
    (el: { groupInfo: { _id: string } }) => el.groupInfo._id === id
  );

  return (
    <div>
      <ExamResultIdPageTable group={group} />
    </div>
  );
};

export default ExamResultIdPage;

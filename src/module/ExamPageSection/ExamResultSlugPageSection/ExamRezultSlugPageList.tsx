import useSWR from "swr";
import { useParams } from "react-router-dom";
import ExamResultPageGroupCard from "../ExamResultPageGroupCard";

const ExamRezultSlugPageList = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useSWR(`/api/exam/exam-results/${slug}`);

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <div>
      <ExamResultPageGroupCard item={data} />
    </div>
  );
};

export default ExamRezultSlugPageList;

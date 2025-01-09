import { useParams } from "react-router-dom";
import useSWR from "swr";
import ExamResultIdPageNav from "../../../../module/ExamPageSection/ExamResultIdPageSection/ExamResultIdPageNav";
import { useState } from "react";
import ExamResultIdGradeList from "../../../../module/ExamPageSection/ExamResultIdPageSection/ExamResultIdGradeList";
import ExamResultIdPageList from "../../../../module/ExamPageSection/ExamResultIdPageSection/ExamResultIdPageList";

const ExamResultIdPage = () => {
  const { slug, id } = useParams();
  const [segment, setSegment] = useState("/exam");
  const { data, error, isLoading } = useSWR(`/api/exam/exam-results/${slug}`);
  const {
    data: group,
    error: groupErr,
    isLoading: isLoadingGroup,
  } = useSWR(`/api/groups/${id}`);

  if (error || groupErr) return <div>ошибка загрузки</div>;
  if (isLoading || isLoadingGroup) return <div>загрузка...</div>;

  const groupId = data?.group?.find(
    (el: { groupInfo: { _id: string } }) => el.groupInfo._id === id
  );

  return (
    <div>
      <ExamResultIdPageNav
        groupId={groupId}
        setSegment={setSegment}
        segment={segment}
      />
      {segment === "/exam" && (
        <ExamResultIdPageList groupId={groupId} group={group} />
      )}
      {segment === "/grade" && <ExamResultIdGradeList />}
    </div>
  );
};

export default ExamResultIdPage;

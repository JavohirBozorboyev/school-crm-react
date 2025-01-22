import {
  Box,
  Grid,
  MultiSelect,
  TextInput,
  Title,
  Text,
  Flex,
  Button,
  NumberInput,
} from "@mantine/core";
import { useRef, useState } from "react";
import useSWR from "swr";
import AddExamResultCard from "../../../../module/ExamPageSection/Add_ExamResult_Section/AddExamResultCard";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const AddExamResultPage = () => {
  const { data: groups, error, isLoading } = useSWR("/api/groups/three");
  const { data: subjects } = useSWR("/api/subjects");
  const { data: teachers } = useSWR("/api/teachers");
  const [groupValue, setGroupValue] = useState<string[]>([]);
  const [examResult, setExamResult] = useState([]);
  const title = useRef<HTMLInputElement>(null);
  const ball = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState({
    title: false,
    ball: false,
    group: false,
  });
  const navigate = useNavigate();

  const SellectChangeGroup = groups?.map(
    (group: { title: string; _id: string }) => ({
      value: group._id,
      label: group.title,
    })
  );

  const subjectSellectData = subjects?.map(
    (item: { _id: string; title: string }) => {
      return { value: item._id, label: item.title };
    }
  );
  const teacherSellectData = teachers?.map(
    (item: {
      _id: string;
      firstname: string;
      lastname: string;
      subject: {
        title: string;
      };
    }) => {
      return {
        value: item._id,
        label:
          item?.firstname +
          " " +
          " " +
          item?.lastname +
          ` ( ${item?.subject?.title} )`,
      };
    }
  );

  const handleGroupChange = (selectedGroups: string[]) => {
    setGroupValue(selectedGroups);
    setExamResult((prevResults) =>
      prevResults.filter((result: { groupInfo: string }) =>
        selectedGroups.includes(result?.groupInfo)
      )
    );
  };

  const CreateExam = async function () {
    if (title.current?.value == null || title.current?.value == "") {
      setErr((prev) => ({ ...prev, title: true }));
      return;
    }
    if (ball.current?.value == null || ball.current?.value == "") {
      setErr((prev) => ({ ...prev, ball: true }));
      return;
    }
    if (examResult.length == 0) {
      setErr((prev) => ({ ...prev, group: true }));
      return;
    }
    setErr({ title: false, ball: false, group: false });
    try {
      const res = await axios.post("/api/exam/exam-results", {
        title: title.current.value,
        maxScore: ball.current.value,
        group: examResult,
      });
      if (res.status == 201) {
        notifications.show({
          title: "Yangi Imtixon qo'shildi",
          message: "",
          withBorder: true,
        });
        title.current.value = "";
        ball.current.value = "";
        setGroupValue([]);
        setExamResult([]);
        navigate("/exam/exam-results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <div>
      <Title order={3}>Yangi imtixon qo'shish</Title>
      <Grid mt={"md"}>
        <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 3 }}>
          <TextInput
            label="Imtixon sarlavhasi"
            placeholder="Sarlavha kiriting"
            withAsterisk
            ref={title}
            variant="filled"
            error={err.title}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2, xl: 1 }}>
          <NumberInput
            label="Ball"
            placeholder="Ball"
            withAsterisk
            ref={ball}
            variant="filled"
            error={err.ball}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 7, xl: 8 }}>
          <MultiSelect
            label="Sinflarni tanlang"
            placeholder="Sinflar"
            data={SellectChangeGroup}
            clearable
            withAsterisk
            onChange={handleGroupChange}
            variant="filled"
            error={err.group}
          />
        </Grid.Col>
      </Grid>

      <Box mt={"md"}>
        {groupValue.length > 0 && (
          <Box>
            <Text size="lg" mb={"md"} c={"teal"}>
              Tanlagan sinflar:
            </Text>
            {groupValue.map((group) => (
              <AddExamResultCard
                group={group}
                groups={groups}
                key={group}
                subjectSellectData={subjectSellectData}
                teacherSellectData={teacherSellectData}
                setExamResult={setExamResult}
              />
            ))}
          </Box>
        )}
      </Box>
      <Flex justify={"flex-end"} mt={"xl"}>
        <Button onClick={CreateExam}>Imtixonni yaratish</Button>
      </Flex>
    </div>
  );
};

export default AddExamResultPage;

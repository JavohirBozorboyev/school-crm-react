/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionIcon,
  Divider,
  Flex,
  Grid,
  Paper,
  Table,
  Tooltip,
} from "@mantine/core";
import { useParams } from "react-router";
import useSWR from "swr";
import ExamResultIdGradeCard from "./ExamResultIdGradeCard";
import * as XLSX from "xlsx";
import { IconDownload } from "@tabler/icons-react";

interface DataProps {
  _id: string;
  subjectInfo: {
    title: string;
  };
  grades: {
    _id: string;
    grade: string;
    student: {
      fullname: string;
    };
  }[];
}

const ExamResultIdGradeList = ({
  downloadInfo,
}: {
  downloadInfo: {
    class: string;
    time: string;
  };
}) => {
  const { slug, id } = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/exam/exam-grades/${slug}?class=${id}`
  );

  const handleDownload = () => {
    if (!data?.all) return;
    const dataDown = data?.all?.students.map(
      (
        student: { fullname: string; grades: { [x: string]: string } },
        index: number
      ) => {
        const row: any = {
          ["№"]: index + 1,
          ["Ism Familiya"]: student.fullname,
        };

        data?.all?.subjects.forEach(
          (subject: { title: string | number }, subIndex: string | number) => {
            row[subject.title] = student.grades[subIndex] || "";
          }
        );

        return row;
      }
    );

    const worksheet = XLSX.utils.json_to_sheet(dataDown);

    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 30 },
      ...data.all.subjects.map(() => ({ wch: 15 })),
    ];

    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "305496" } },
      alignment: { horizontal: "center", vertical: "center" },
    };

    const headers = Object.keys(dataDown[0] || {});
    headers.forEach((_, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      worksheet[cellAddress].s = headerStyle;
    });

    for (let R = 1; R <= dataDown.length; R++) {
      for (let C = 0; C < headers.length; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (worksheet[cellAddress]) {
          worksheet[cellAddress].s = {
            alignment: { horizontal: "center", vertical: "center" },
          };
        }
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);

    const formattedDate = new Date(downloadInfo?.time).toLocaleDateString(
      "en-GB",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );

    XLSX.writeFile(
      workbook,
      `Natijalar_${downloadInfo?.class}_${formattedDate}.xlsx`
    );
  };

  if (error) return <div>failed to load merge</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main>
      <Divider mb={"lg"} label="Barcha Natijalar" />

      <Paper withBorder radius={"sm"} p={"xs"}>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={300} fw={500}>
                  Ism Familiya
                </Table.Th>
                {data?.all?.subjects.map(
                  (item: { _id: string; title: string }) => {
                    return (
                      <Table.Th key={item._id} ta={"center"} w={150} fw={500}>
                        {item.title}
                      </Table.Th>
                    );
                  }
                )}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.all?.students.map(
                (
                  element: {
                    fullname: string;
                    grades: number[];
                  },
                  i: number
                ) => (
                  <Table.Tr key={i}>
                    <Table.Td>{element.fullname}</Table.Td>
                    {element?.grades.map((grade: number, index: number) => {
                      return (
                        <Table.Td key={index} ta={"center"}>
                          {grade}
                        </Table.Td>
                      );
                    })}
                  </Table.Tr>
                )
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        <Flex justify={"flex-end"}>
          <Tooltip label="Exel xolatida yuklash" withArrow>
            <ActionIcon
              size={"lg"}
              onClick={handleDownload}
              variant="light"
              aria-label="Settings"
            >
              <IconDownload size={18} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Paper>
      <Divider my={"lg"} label="Fanlar bo'yicha natijalar" />
      <Grid mt={"md"}>
        {data?.sb?.map((item: DataProps, i: number) => {
          return (
            <Grid.Col key={i} span={{ base: 12, md: 6, xl: 4 }}>
              <ExamResultIdGradeCard item={item} />
            </Grid.Col>
          );
        })}
      </Grid>
    </main>
  );
};

export default ExamResultIdGradeList;

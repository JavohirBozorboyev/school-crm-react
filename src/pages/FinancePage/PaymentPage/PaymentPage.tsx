import { Button, Divider, Grid, Paper, Select, Title } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import ChekPdf from "../../../utils/ChekPdf";

const PaymentPage = () => {

  const Payment = ()=>{
    ChekPdf()
  }
  return (
    <div>
      <Title order={4}>To'lov Qilish</Title>
      <Paper withBorder mt={"md"} p={"sm"}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
            <Select
              label="Sinf Tanlash"
              defaultValue={"react"}
              description="Barcha sinflar"
              withAsterisk
              data={[
                {
                  group: "4-Sinflar",
                  items: [
                    { label: "4-Green", value: "react" },
                    { label: "4-Blue", value: "angular" },
                  ],
                },
                {
                  group: "5-Sinflar",
                  items: [
                    { label: "5-Green", value: "express" },
                    { label: "5-Blue", value: "koa" },
                  ],
                },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
            <Select
              label="O'quvchi Tanlash"
              description="7-green"
              defaultValue={"react"}
              withAsterisk
              data={[
                { label: "Alisher", value: "react" },
                { label: "Sadula", value: "angular" },
                { label: "Sherzod", value: "svelte" },
                { label: "Ali", value: "vue" },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
            <MonthPickerInput label="Pick date" placeholder="Pick date" description="Hozirgi Oy" />
          </Grid.Col>
          <Grid.Col span={12}>
            <Divider />
          </Grid.Col>
        </Grid>
      </Paper>

      <Button onClick={Payment}>Cheks</Button>
    </div>
  );
};

export default PaymentPage;

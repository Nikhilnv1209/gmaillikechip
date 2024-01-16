import Chipcomponent from "@/components/Chipcomponent";

export interface IUserinfo {
  id: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
}

const fetchData = async () => {
  const res = await fetch(
    "https://hub.dummyapis.com/employee?noofRecords=15&idStarts=1"
  );
  const data = await res.json();
  return data;
};

export default async function Home() {
  const userinfo: IUserinfo[] = await fetchData();
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1>User Picker</h1>
      <Chipcomponent userinfo={userinfo} />
    </main>
  );
}

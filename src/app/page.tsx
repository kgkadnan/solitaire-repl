import CustomCommandExample from "@/components/common/cammand/example";
import SideBar from "@/components/common/sidebar";

export default function Home() {
  return (
    <>
      {/* <h1
        style={{
          fontSize: "100px",
          display: "flex",
          justifyContent: "center",
          marginTop: "300px",
        }}
      >
        Welcome to KGK live 2.O
      </h1>
      <h1
        style={{
          fontSize: "30px",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        Bulding Digital diamond platform
      </h1> */}
      <SideBar />
      <CustomCommandExample />
    </>
  );
}

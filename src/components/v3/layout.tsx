export default function Layout({ children }: any) {
  return (
    <>
      {/* <Meta /> */}
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  );
}

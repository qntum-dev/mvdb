const ErrorComp = ({ error }: { error: Error & { digest?: string } }) => {
  console.log(error);

  return (
    <div className="w-full h-full flex gap-32 items-center justify-center">
        <div className="mt-12 flex flex-col gap-14">
          <h1 className="text-5xl font-bold">404 Page Not Found</h1>
          <p className="text-xl">This page is not worthy...</p>
          <p className="text-xl w-[500px]">
            Check that you typed the address correctly, go back to your previous
            page or search a different thing
          </p>
        </div>
      <div
        className="bg-center bg-cover rounded-bl-3xl rounded-tr-3xl  w-[300px] h-[500px] border-b border-red-600"
        style={{
          backgroundImage: "url(/hammer.png)",
        }}
      ></div>
    </div>
  );
};

export default ErrorComp;

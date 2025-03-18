const ErrorComp = ({ error }: { error: Error & { digest?: string } }) => {
  console.log(error);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row lg:gap-32 items-center justify-center">
        <div className="mt-12 flex flex-col gap-8 lg:gap-14 items-center lg:items-start">
          <h1 className="lg:text-5xl text-2xl font-bold">404 Page Not Found</h1>
          <p className="text-xl">This page is not worthy...</p>
          <div
        className="bg-center lg:hidden bg-cover rounded-bl-3xl rounded-tr-3xl w-[100px] h-[180px]"
        style={{
          backgroundImage: "url(/hammer.png)",
        }}
      ></div>
          <p className="text-xl lg:w-[500px] text-center lg:text-start">
            Check that you typed the address correctly, go back to your previous
            page or search a different thing
          </p>
        </div>
      <div
        className="hidden lg:block bg-center bg-cover rounded-bl-3xl rounded-tr-3xl w-[300px] h-[500px] border-b border-red-600"
        style={{
          backgroundImage: "url(/hammer.png)",
        }}
      ></div>
    </div>
  );
};

export default ErrorComp;

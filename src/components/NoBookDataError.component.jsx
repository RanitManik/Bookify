export const NoBookDataErrorComponent = () => {
  return (
    <main className="grid min-h-[min(90svh,_1000px)] place-items-center content-center gap-4 p-6 text-center">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        500 | No books available.
      </h1>
      <p className="max-w-2xl leading-7">
        This issue may be caused by an internal server error or other technical
        issues on our end. We're aware of the issue and are working to fix it
        promptly.
      </p>
    </main>
  );
};

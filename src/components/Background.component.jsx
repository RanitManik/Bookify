const BackgroundComponent = ({ children }) => {
  return (
    <main className="m-auto min-h-[100svh] bg-muted/40">
      <div className="mx-auto max-w-[2000px]">{children}</div>
    </main>
  );
};

export default BackgroundComponent;

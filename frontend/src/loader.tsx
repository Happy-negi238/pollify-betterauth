import "./loader.css";

const Loader = ({ message }: { message?: string }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-slate-700">
      <div className="flex items-center justify-center gap-3">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
      {message && <p className="text-sm font-medium">{message}</p>}
    </div>
  );
};

export default Loader;

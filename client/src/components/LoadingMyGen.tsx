const LoadingMyGen = () => {
  return (
    <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white/8 border-white/12 rounded-2xl p-4 h-52"
        />
      ))}
    </div>
  );
};

export default LoadingMyGen;

const Spinner = ({ show, wait }: { show?: boolean; wait?: `delay-${number}` }) => {
  return (
    <div
      className={`inline-flex h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${
        (show ?? true) ? `opacity-100 duration-500 ${wait ?? 'delay-300'}` : 'opacity-0 delay-0 duration-500'
      }`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

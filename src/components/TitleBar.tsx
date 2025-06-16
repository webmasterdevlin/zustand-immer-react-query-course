type Props = {
  title: string;
};

const TitleBar = ({ title }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" data-testid="title-page">
        {title}
      </h1>
    </div>
  );
};

export default TitleBar;

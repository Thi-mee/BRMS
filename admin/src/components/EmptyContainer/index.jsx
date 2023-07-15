
const EmptyCtn = ({ text, children }) => {
  return (
    <div className="emptyContainer">
      <img
        src="/assets/illustrations/empty_list.png"
        alt=""
        width={300}
        height={250}
      />
      <p>{text}</p>
      {children && children}
    </div>
  );
};

export default EmptyCtn;

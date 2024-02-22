interface SkeletonProps {
  width?: string;
  height?: string;
  length?: number;
}

const Skeleton = ({ width, height, length = 3 }: SkeletonProps) => {
  const Skeletons = Array.from({ length }, (_, index) => (
    <div className="skeleton-shape" key={index}></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width, height }}>
      {Skeletons}
    </div>
  );
};

export default Skeleton;

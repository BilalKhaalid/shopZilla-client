import { useState, CSSProperties } from "react";
import { ClimbingBoxLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = () => {
  const [loading] = useState(true);
  return (
    <div className="loading">
      <div className="loader">
        <ClimbingBoxLoader
          color="red"
          loading={loading}
          cssOverride={override}
          size={22}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
    // <ClimbingBoxLoader color="#36d7b7" />;
  );
};

export default Loader;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((oldState) => oldState - 1);
    }, 1000);

    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting in {count} seconds</p>
    </div>
  );
}

export default LoadingToRedirect;

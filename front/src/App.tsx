import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Main.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/problemList");
  }, [navigate]);

  return null;
}

export default App;

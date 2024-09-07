import { useContext } from "react";
import AppContext from "../context/AppContext";
import Chart from "../components/Chart";

const Clusters = () => {
  const { data, labels, dataPCA, labelsPCA } = useContext(AppContext);

  return (
    <div className="flex flex-col lg:flex-row py-10">
      <div className="flex flex-col items-center">
        <h3 className="text-lg pb-4">Without PCA</h3>
        <Chart data={data} labels={labels} />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-lg pb-4">With PCA</h3>
        <Chart data={dataPCA} labels={labelsPCA} />
      </div>
    </div>
  );
};
export default Clusters;

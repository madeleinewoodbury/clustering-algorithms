import { useContext } from "react";
import AppContext from "../context/AppContext";
import Chart from "../components/Chart";
import ClusterForm from "../components/ClusterForm";

const Home = () => {
  const { loading, data, labels, dataPCA, labelsPCA, clusterData } =
    useContext(AppContext);

  const handleClick = () => {
    clusterData("kmeans", "wine");
  };
  return (
    <div className="bg-slate-200 h-screen w-screenpy-10 flex flex-col items-center py-20">
      <ClusterForm />
      <div className="container mx-auto flex flex-col items-center gap-10 mt-8">
        <div className="flex gap-16">
          <div className="flex flex-col items-center">
            <h3 className="text-lg pb-4">Without PCA</h3>
            <Chart data={data} labels={labels} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg pb-4">With PCA</h3>
            <Chart data={dataPCA} labels={labelsPCA} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

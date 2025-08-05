import { useContext } from "react";
import AppContext from "../context/AppContext";

const ClusterForm = () => {
  const {
    algorithm,
    dataset,
    setAlgorithm,
    setDataset,
    algorithms,
    datasets,
    clusterData,
  } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    clusterData(algorithm, dataset);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center flex-wrap md:flex-row md:justify-start"
    >
      <div className="w-full py-2 md:w-1/3 md:px-2">
        <select
          name="algorithm"
          id="algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md w-full p-2"
        >
          <option value="" disabled>
            Select algorithm
          </option>
          {Object.keys(algorithms).map((key) => (
            <option value={key} key={key}>
              {algorithms[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full py-2 md:w-1/3 md:px-2">
        <select
          name="dataset"
          id="dataset"
          value={dataset}
          onChange={(e) => setDataset(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md w-full p-2"
        >
          <option value="" disabled>
            Select dataset
          </option>
          {Object.keys(datasets).map((key) => (
            <option value={key} key={key}>
              {datasets[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-center py-2 md:w-1/3 md:justify-start md:px-4">
        <input
          type="submit"
          className="py-2 px-3 bg-indigo-700 text-white rounded cursor-pointer hover:bg-indigo-800 w-full"
          value="Cluster Data"
        />
      </div>
    </form>
  );
};
export default ClusterForm;

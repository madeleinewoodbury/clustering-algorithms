import { useState, useContext } from "react";
import AppContext from "../context/AppContext";

const ClusterForm = () => {
  const [algorithm, setAlgorithm] = useState("");
  const [dataset, setDataset] = useState("");
  const { algorithms, datasets, clusterData } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    clusterData(algorithm, dataset)
  };


  return (
    <div className="container">
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-end gap-4"
    >
      <div className="w-1/4">
        <label htmlFor="algorithm" className="mb-2 text-gray-900">
          Select Algorithm
        </label>
        <select
          name="algorithm"
          id="algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md w-full p-2"
        >
          {Object.keys(algorithms).map((value) => (
            <option value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div className="w-1/4">
        <label htmlFor="dataset" className="mb-2 text-gray-900">Select Dataset</label>
        <select
          name="dataset"
          id="dataset"
          value={dataset}
          onChange={(e) => setDataset(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md w-full p-2"
        >
          {Object.keys(datasets).map((value) => (
            <option value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div className="w-1/6">
      <button
          type="submit"
          className="py-2 px-3 bg-indigo-700 text-white rounded"
        >
        Cluster Data
        </button>
      </div>
    </form>
    </div>

  );
};
export default ClusterForm;

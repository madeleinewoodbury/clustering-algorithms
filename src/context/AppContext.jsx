import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [algorithms, setAlgorithms] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [dataPCA, setDataPCA] = useState([]);
  const [labelsPCA, setLabelsPCA] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch both algorithms and datasets
        const [algorithmsRes, datasetsRes] = await Promise.all([
          fetch("/api/cluster/algorithms"),
          fetch("/api/cluster/dataset"),
        ]);

        const algorithmsData = await algorithmsRes.json();
        const datasetsData = await datasetsRes.json();

        // Update state
        setAlgorithms(algorithmsData.algorithms);
        setDatasets(datasetsData.datasets);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const clusterData = async (algorithm, dataset) => {
    setLoading(true);
    try {
      const fetchClusterData = async (usePCA) => {
        const response = await fetch("/api/cluster", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            algorithm: algorithm,
            dataset: dataset,
            use_pca: usePCA,
          }),
        });
        return await response.json();
      };

      // Fetch data for both PCA and non-PCA
      const [result, resultPCA] = await Promise.all([
        fetchClusterData(false),
        fetchClusterData(true),
      ]);

      // Set data for non-PCA
      setData(result.data);
      setLabels(result.labels);

      // Set data for PCA
      setDataPCA(resultPCA.data);
      setLabelsPCA(resultPCA.labels);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        algorithms,
        datasets,
        loading,
        data,
        labels,
        dataPCA,
        labelsPCA,
        clusterData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

import { useContext } from "react";
import AppContext from "../context/AppContext";
import ClusterForm from "../components/ClusterForm";
import Clusters from "../components/Clusters";
import Spinner from "../components/Spinner";

const Home = () => {
  const { loading } = useContext(AppContext);

  return (
    <main className="bg-slate-200 h-screen w-full">
      <div className="container mx-auto">
        <h1 className="text-3xl text-center pt-8 pb-6">Clustering Algorithms</h1>
        <ClusterForm />
        {loading ? <Spinner /> : <Clusters/>}
      </div>
    </main>
  );
};
export default Home;

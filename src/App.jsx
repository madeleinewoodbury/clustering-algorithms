import {useState} from 'react'
import Chart from './components/Chart'

const App = () => {
  const [data, setData] = useState([])
  const [labels, setLabels] = useState([])
  const [featureNames, setFeatureNames] = useState([])

  const fetchData = async () => {
    try{
      const response = await fetch('/api/cluster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          algorithm: 'kmeans',
          dataset: 'wine',
          use_pca: false
        })
      })

      const result = await response.json()
      setData(result.data)
      setLabels(result.labels)
      setFeatureNames(result.featureNames)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-slate-200 h-screen w-screenpy-10 flex justify-center items-center'>
      <div className="container mx-auto flex flex-col items-center gap-10">
      <button onClick={fetchData} className="py-2 px-3 bg-indigo-700 text-white rounded">
        Load Data
      </button>
      <Chart data={data} labels={labels} featureNames={featureNames}/>
      </div>
    </div>
  )
}
export default App
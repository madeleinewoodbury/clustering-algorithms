import RiseLoader from 'react-spinners/RiseLoader'

const override = {
  display: 'block',
}

const Spinner = ({ loading }) => {
  return (
    <div className='flex justify-center py-32'>
      <RiseLoader
        color="#4338CA"
        loading={loading}
        cssOverride={override}
        size={20}
      />
    </div>
      
  )
}
export default Spinner
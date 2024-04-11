import { CircularProgress } from "@material-ui/core";


const Loading: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', opacity: 0.3}}>
      <CircularProgress />
    </div>
  )
}

export default Loading

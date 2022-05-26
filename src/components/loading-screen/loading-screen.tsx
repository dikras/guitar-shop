import Loader from 'react-loader-spinner';

function LoadingScreen(): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 250,
      height: '100%'}} data-testid="loading"
    >
      <Loader
        type="Watch"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  );
}

export default LoadingScreen;

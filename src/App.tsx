import AppRoutes from './routes';

const App = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center flex-col space-y-8">
        <AppRoutes />
      </div>
    </>
  );
};

export default App;

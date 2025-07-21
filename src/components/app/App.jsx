import ConverterForm from "../conveterForm/ConverterForm";
import "./app.scss";

const App = () => {
  return (
    <div className="currency-converter">
      <h2 className="converter__title">Currency Converter</h2>
      <ConverterForm />
    </div>
  );
};

export default App;

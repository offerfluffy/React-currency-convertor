const App = () => {
  return (
    <div className="currency-converter">
      <h2 className="converter__title">Currency Converter</h2>
      <form action="" className="converter__form">
        <div className="form__group">
          <label className="form__label">Enter Amount </label>
          <input type="number" className="form__input" required />
        </div>
        <div className="form__group">
          <div className="form__section">
            <label className="form__label">From</label>
            <div className="currency-select">
              <img src="https://flagsapi.com/US/flat/64.png" alt="Flag" />
              <select className="currency-dropdown">
                <option value="USD" selected>
                  USD
                </option>
              </select>
            </div>
          </div>

          <div className="swap-icon">
            <svg
              width="16"
              viewBox="0 0 20 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#000"
              />
            </svg>
          </div>

          <div className="form__section">
            <label className="form__label">To</label>
            <div className="currency-select">
              <img src="https://flagsapi.com/UA/flat/64.png" alt="Flag" />
              <select className="currency-dropdown">
                <option value="UAH" selected>
                  UAH
                </option>
              </select>
            </div>
          </div>

          <button className="submit-button" type="submit">
            Get Exchange Rate
          </button>

          <p className="exchange-rate-result">1,000 USD = 48,000 UAH</p>
        </div>
      </form>
    </div>
  );
};

export default App;

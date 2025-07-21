import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./converterForm.scss";
import CurrencySelect from "../currencySelect/CurrencySelect";

const ConverterForm = () => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getExchangeRate({
      amount: 100,
      fromCurrency: "USD",
      toCurrency: "UAH",
    });
  }, []);

  const getExchangeRate = async ({ amount, fromCurrency, toCurrency }) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    setIsLoading(true);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();

      const rate = (data.conversion_rate * amount).toFixed(2);

      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (values) => {
    getExchangeRate(values);
  };

  return (
    <Formik
      initialValues={{
        amount: 100,
        fromCurrency: "USD",
        toCurrency: "UAH",
      }}
      validationSchema={Yup.object({
        amount: Yup.number().min(1).required("Must be filled"),
        fromCurrency: Yup.string().required("Must be filled"),
        toCurrency: Yup.string().required("Must be filled"),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ values, setFieldValue }) => {
        const { amount, fromCurrency, toCurrency } = values;
        return (
          <Form className="converter__form">
            <div className="form__group">
              <label className="form__label">Enter Amount </label>
              <Field
                name="amount"
                type="number"
                className="form__input"
                value={amount}
              />
              <ErrorMessage name="amount" />
            </div>
            <div className="form__group form__group_currency">
              <div className="form__section">
                <label className="form__label">From</label>
                <CurrencySelect
                  name="fromCurrency"
                  value={fromCurrency}
                  onChange={(e) =>
                    setFieldValue("fromCurrency", e.target.value)
                  }
                />
              </div>

              <div
                className="swap-icon"
                onClick={() => {
                  const temp = fromCurrency;
                  setFieldValue("fromCurrency", toCurrency);
                  setFieldValue("toCurrency", temp);
                }}
              >
                <svg
                  width="16"
                  viewBox="0 0 20 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                    fill="#fff"
                  />
                </svg>
              </div>

              <div className="form__section">
                <label className="form__label">To</label>
                <CurrencySelect
                  name="toCurrency"
                  value={toCurrency}
                  onChange={(e) => setFieldValue("toCurrency", e.target.value)}
                />
              </div>
            </div>
            <button
              className={`${isLoading ? "loading" : ""} submit-button`}
              type="submit"
            >
              Get Exchange Rate
            </button>

            <p className="exchange-rate-result">
              {isLoading ? "Getting exchange rate..." : result}
            </p>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ConverterForm;

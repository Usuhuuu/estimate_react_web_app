import NavigationBar from "../nav";
import "./css/changing.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookie from "js-cookie";
import Footer from "../footer";
import Select from "react-select";
import questionSets from "../QuestionData/question";
import { useState } from "react";

const Interior = () => {
  const [questionData] = useState(questionSets.interior);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [steps, setSteps] = useState([]);

  const selectedSet =
    selectedCategory === "주거 공간 인테리어"
      ? questionData.main_interior
      : selectedCategory === "상업공간 인테리어"
      ? questionData.sub_interior
      : [];

  console.log("Selected Set:", selectedCategory);

  return (
    <>
      <div className="formContainer">
        <NavigationBar />
        <Formik initialValues={questionData.decision}>
          <Form noValidate>
            <div>
              <h1>Interior</h1>
              <div>
                {questionData.options.map((options) => {
                  return (
                    <div key={options.value}>
                      <Field
                        type="radio"
                        name="category"
                        value={options}
                        onChange={(e) => {
                          setSelectedCategory(e.target);
                          setSelectedOptions([]);
                        }}
                      />
                      <label htmlFor={options.value}>{options.label}</label>
                    </div>
                  );
                })}
                {selectedCategory && (
                  <div>
                    <p>{}</p>
                  </div>
                )}
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Interior;

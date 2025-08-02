import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../nav";
import { Form, Formik, Field } from "formik";
import questionSets, { Questions } from "../QuestionData/question";
import Loading from "../../loader/loading";
import Footer from "../footer";

const DynamicSubQuestions = () => {
  const { type } = useParams();

  if (!type || !questionSets[type]) return <Loading />;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(questionSets[type]);
  const currentQuestion = questions[questionIndex];
  const [subQuestionMap, setSubQuestionMap] = useState({});

  useEffect(() => {
    const buildSubQuestionMap = (questions: any) => {
      const map = {};

      const traverse = (qs: any[]) => {
        qs.forEach((q: { options: any[] }) => {
          q.options?.forEach(
            (opt: { sub_questions: any; value: any; label: any }) => {
              if (opt.sub_questions) {
                map[opt.value || opt.label] = opt.sub_questions;
                traverse(opt.sub_questions);
              }
            }
          );
        });
      };

      traverse(questionSets[type]);
      return map;
    };

    if (type && questionSets[type]) {
      const map = buildSubQuestionMap(questionSets[type]);
      setQuestions(questionSets[type]);
      setSubQuestionMap(map);
    }
  }, [type]);

  const handleOptionChange = (option: {
    id?: string | number;
    label: any;
    options?: string[] | { label: string; districts?: string[] }[];
    value?: any;
  }) => {
    const key = option.value || option.label;
    if (subQuestionMap[key]) {
      setQuestions(subQuestionMap[key]);
      setQuestionIndex(0);
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-100">
      <NavigationBar />
      <div className="flex-grow flex justify-center items-center p-5">
        <Formik
          initialValues={{ question_: questionIndex }}
          onSubmit={(values) => console.log(values)}
        >
          <Form className="bg-white shadow p-6 rounded w-full max-w-lg">
            {currentQuestion && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  {currentQuestion.text}
                </h2>

                {type === "interior" && questionIndex === 0
                  ? currentQuestion.options.map((option: Questions) => {
                      return (
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name={`question_${questionIndex}`}
                              value={
                                typeof option === "string"
                                  ? option
                                  : option.label
                              }
                              className="mr-2"
                              onClick={() => {
                                handleOptionChange(option);
                              }}
                            />
                            {typeof option === "string" ? option : option.label}
                          </label>
                        </div>
                      );
                    })
                  : (currentQuestion.options || currentQuestion).map(
                      (option: Questions, index: number) => (
                        <div key={index} className="mb-2">
                          <label>
                            <Field
                              type="radio"
                              name={`question_${questionIndex}`}
                              value={
                                typeof option === "string"
                                  ? option
                                  : option.label
                              }
                              className="mr-2"
                            />
                            {typeof option === "string" ? option : option.label}
                          </label>
                        </div>
                      )
                    )}

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (questionIndex > 0) {
                        setQuestionIndex((prev) => prev - 1);
                      }
                    }}
                    disabled={questionIndex === 0}
                    className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                  >
                    Back
                  </button>
                  {questionIndex < questions.length - 1 ||
                  (type === "interior" && questionIndex === 0) ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (questionIndex < questions.length - 1) {
                          setQuestionIndex((prev) => prev + 1);
                        }
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </>
            )}
          </Form>
        </Formik>
      </div>
      <Footer />
    </div>
  );
};

export default DynamicSubQuestions;

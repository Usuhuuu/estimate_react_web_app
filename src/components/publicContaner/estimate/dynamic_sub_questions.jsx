import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../nav";
import { Form, Formik } from "formik";
import questionSets from "../QuestionData/question";

const DynamicSubQuestions = () => {
  const { type } = useParams();
  const [questionData] = useState(questionSets);
  console.log(type);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <NavigationBar />
      <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
        <Form className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded shadow"></Form>
      </Formik>
    </div>
  );
};

export default DynamicSubQuestions;

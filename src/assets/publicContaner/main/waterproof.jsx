import React, { useRef,useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../nav';
import './css/changing.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';


import Footer from '../footer'
import Select from 'react-select';

const urlApi = 'http://localhost:3001';
const localhost = 'localhost';

const Waterproof = () => {
  const [questionSets, setQuestionSets] = useState([
  [ 
    {id:8.1, text:'건물 종류는 어떻게 되나요?', options:["단독주택","아파트","빌라","다가구",'상가','공장',"기타"]},
  ],
  [
    {id:9.2, text:"방수 공사할 장소는 어디인가요?", options:['옥상','외벽','욕실','발코니','기타']},
    {id:9.3, text:"대략 방수 면적을 알려주세요",options:['10평 이하','10평 - 20평', '30평 - 40평', '40평 - 50평', '해당 없음']},
    {id: 10.2, text: "주소를 선택해 주세요",options: [
        { label: "서울", districts: ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"] },
        { label: "인천", districts: ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군"] },
        { label: "경기", districts: ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"] },
        ],},
    {id:9.5, text:"견적 요청하겠습니까?",options:['네','아니요']},
  ]
  ]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedSpecific, setSelectedSpecific] = useState(false)
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [enteredText, setEnteredText] = useState('');
  const [lastQuestion, setLastQuestion] = useState(false)
  const [selectedCitys, setSelectedCitys] = useState('')
  const [selectedDistricts, setSelectedDistricts] = useState('');
  const [renderedDistricts, setRenderedDistricts] = useState(false)
  const [finalAddress, setFinalAddress] =useState('')
  const [districtUpdated, setDistrictUpdated] = useState(false);
  const [updatedValue, setUpdatedValue]= useState(false)
  const generateInitialValues = (sets) => {
    const initialValues = {};
    sets.forEach((set) => {
      set.forEach((question) => {
        initialValues[question.id] = '';
      });
    });
    return initialValues;
  };
  const generateValidationSchema = (sets) => {
    const validationSchema = sets.reduce((schema, set) => {
      set.forEach((question) => {
        schema[question.id] = Yup.string().required('This field is required');
      });
      return schema;
    }, {});
    return Yup.object().shape(validationSchema);
  };
  const handleTextChange = (e) => {
    setEnteredText(e.target.value);
  };
  
  const handleSubmit = async ({setSubmitting}) => {
    try{
      const authToken=localStorage.getItem('authToken');
      if(!authToken){
        try{
          const isConfirmed = window.confirm('견적 받기 위해서 로그인하세요!');
          if(isConfirmed) {
            const origin = window.location.origin;
            const authPopup = window.open(`${origin}/auth/login`, '_blank','width=600, height=600');
            const expirationTimeInMinutes = 5;
            const expirationTime = new Date(new Date().getTime() + expirationTimeInMinutes * 60000);
            Cookie.set('surveyData', JSON.stringify({answeredQuestions}), {
              expires: expirationTime,
              path:'/waterproof',
              domain:`${localhost}`,
              sameSite:'Lax'
            })
            if(!authPopup){
              alert('팝업 차단을 꺼주세요!')
              Cookie.remove('surveyData',{
                path:'/waterproof',
                domain:`${localhost}`,
                sameSite:'Lax'
              })
              return;
            }
            const popupClosedPromise = new Promise((resolve) => {
              const pollPopup =setInterval(()=> {
                const newAuthToken = localStorage.getItem('authToken');
                if(authPopup.closed || newAuthToken){
                  clearInterval(pollPopup);
                  resolve();
                  if(newAuthToken){
                    authPopup.close();
                    window.location.reload();
                  }else{
                    alert('Authentication Failed. Please try again');
                  }
                } 
              },1000)
            })
            await popupClosedPromise;
          } else{
            Cookie.remove('surveyData',{
              path:'/waterproof',
              domain:`${localhost}`,
              sameSite:'Lax'
            })
            window.location.href = '/'
          }
        } catch(error){
          console.error('Error opening authentication pop-up:', error);
          alert('Failed to open authentication pop-up. Please try again.');
        }
      } else {
        try {
          console.log(answeredQuestions )
          const response = await axios.post(`${urlApi}/auth/interior`,
            { answeredQuestions, estimateType: '누수' }, {
              headers: {
                'Authorization': authToken,
              },
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            alert('견적요청이 성공하셨습니다.');
            Cookie.remove('surveyData', {
              path: '/waterproof',
              domain: `${localhost}`,
              sameSite: 'Lax'
            });
            // if (selectedOption === 'no') {
            //   Cookie.remove('surveyData', {
            //     path: '/waterproof',
            //     domain: `${localhost}`,
            //     sameSite: 'Lax'
            //   });
            //   window.location.href = '/';
            //   return;
            // }
          } else {
            const errorMessage = `Unexpected response status: ${response.status}`;
            alert(errorMessage);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          // Add additional logging or error handling here
        } finally {
          setSubmitting(false);
        }
      }
    } catch(error) {
      console.error('Error submitting form:', error);
    } finally{
      setSubmitting(false);
    }
  };
  const loadFromCookie = () => {
    const savedDataString = Cookie.get('surveyData',{
      path: '/waterproof',
      domain: localhost,
      sameSite: 'Lax'
    });
    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);
      setAnsweredQuestions(savedData.answeredQuestions)
      const lastSetIndex = questionSets.length - 1;
      const lastQuestionIndex = questionSets[lastSetIndex].length - 1;
      setCurrentSetIndex(lastSetIndex);
      setCurrentQuestionIndex(lastQuestionIndex);
      setLastQuestion(true)
    }
    Cookie.remove('surveyData', {
      path: '/waterproof',
      domain: `${localhost}`,
      sameSite: 'Lax'
    });
  };
  useEffect(() => {
    loadFromCookie();
  }, []);
  const handleNextQuestion = () => {
    const currentQuestionSet = questionSets[currentSetIndex];
    const currentQuestion = currentQuestionSet[currentQuestionIndex];
    const selectedOption = formValues[currentQuestion.id];
    setAnsweredQuestions([...answeredQuestions, { questionId: currentQuestion.id, selectedOption }]);
    console.log('answeredQuestions: ',answeredQuestions)
    if (currentQuestionSet === questionSets[0]) {
      // Check the answer to the first question and move to the corresponding set
      if (selectedOption === "단독주택"||"아파트"||"빌라"||"다가구"||'상가'||'공장'||"기타") {
        setCurrentSetIndex(1);
        setIsOptionSelected(false);
      } else if (selectedOption === "상업공간 인테리어") {
        setCurrentSetIndex(2);
        setIsOptionSelected(false);
      }
    } else if (currentQuestionIndex < currentQuestionSet.length - 1) {
      // Move to the next question in the current set
      setIsOptionSelected(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSetIndex < questionSets.length - 1) {
      // Move to the next set of questions
      setCurrentSetIndex(currentSetIndex + 1);
      setCurrentQuestionIndex(0);
      setIsOptionSelected(false);
    } else {
      console.log("End of questions");
      setLastQuestion(true)
    }
    setShowPreview(false);
    setFormValues(generateInitialValues(questionSets));
  };
  const questionIdRef = useRef(null);
  const handleRadioChange = (questionId, option) => {
    setIsOptionSelected(true);
    setSelectedSpecific(false);
    questionIdRef.current = questionId;
    const isCityQuestion = questionId === 10.2;
    const isQuestionAnswered = answeredQuestions.some((q) => String(q.questionId) === String(questionId));
    console.log('sda',isQuestionAnswered)
    if (isQuestionAnswered) {
      if(option === '기타'|| option === '해당 없음'){
        setSelectedSpecific(true);
        setAnsweredQuestions((prevAnswers) => {
          const updatedAnswers = prevAnswers.map((answer) => {
            if (answer[questionId] !== undefined) {
              return {
                [questionId]: option === '기타' || option === '해당 없음' ? 'NEW' + enteredText.substring(0, 255) : "NEW" + option,
              };
            }
            return answer;
          });
          return updatedAnswers;
        });
      } else{
        setAnsweredQuestions((prevAnswers)=> [
          ...prevAnswers,
          {[questionId]: `NEW`+ option}
        ])
      }
    } else if(isCityQuestion) {
      const chosenCity = formValues[10.2] && formValues[10.2].label;
        if (chosenCity) {
          handleCitySelection();
          return;
        } else if (option === '기타' || option === '해당 없음') {
          setSelectedSpecific(true);
          setUpdatedValue(true);
        }
    }
    if(option === '기타'|| option === '해당 없음'){
      setSelectedSpecific(true);
      setUpdatedValue(true);
      
    } 
    setFormValues((prevValues) => ({
      ...prevValues,
      [questionId]: option || ''
    }));
  };
  useEffect(() => {
    if (updatedValue) {
      const limitedText = enteredText.substring(0, 255);
      setAnsweredQuestions((prevAnswers) => {
        const filteredAnswers = prevAnswers.filter((item) => item[questionIdRef.current] === undefined);
        const updatedItem = { [questionIdRef.current]: 'NEW'+limitedText };
        return [...filteredAnswers, updatedItem];
      });
    }
  }, [updatedValue, enteredText]);
  const handleCitySelection = async (selectedCityOption) => {
    if (selectedCityOption) {
      const chosenCity = selectedCityOption.value;
      setSelectedCitys(chosenCity);
      const cityOption = questionSets[currentSetIndex][currentQuestionIndex].options.find(
        (opt) => opt.label === chosenCity
      );
      if (cityOption) {
        const renderDistricts = cityOption.districts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ));
        setRenderedDistricts(renderDistricts)
      } else {
        console.error(`City option not found for ${chosenCity}`);
        setRenderedDistricts(null);
      }
    }  else {
      setRenderedDistricts(null);
      setSelectedDistricts('');
    }
  };
  useEffect(() => {
    if (selectedDistricts && !districtUpdated) {
      setDistrictUpdated(true);
      const generatedAddress = selectedCitys + ' ' + selectedDistricts;
      setFinalAddress(generatedAddress);
      setFormValues((prevValues)=> ({
        ...prevValues,
        '10.2': generatedAddress
      }))
    }
  }, [selectedDistricts, districtUpdated]);
  useEffect(() => {
    handleCitySelection();
  }, [formValues, currentSetIndex, currentQuestionIndex],[finalAddress], [isOptionSelected]);
  const handlePreview  = () => {
    if (currentSetIndex === 0 && currentQuestionIndex === 0) {
      setCurrentSetIndex(0)
      return;
    }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if(currentSetIndex === 2){
      const previousSetIndex = currentSetIndex - 2;
      setCurrentSetIndex(previousSetIndex);
      setCurrentQuestionIndex(questionSets[previousSetIndex].length - 1);
      console.log(currentQuestionIndex)
    }else if (currentSetIndex > 0) {
      const previousSetIndex = currentSetIndex - 1;
      setCurrentSetIndex(previousSetIndex);
      setCurrentQuestionIndex(questionSets[previousSetIndex].length - 1);
    } 
    setShowPreview(false);
    setFormValues(generateInitialValues(questionSets));
    setSelectedSpecific(false)
  };
  const renderSelectComponents = () => {
    const question = questionSets[currentSetIndex][currentQuestionIndex];
    if (question.id === 10.2) {
      return (
        <>
          <Select
            id="city"
            name="city"
            value={{ label: selectedCitys, value: selectedCitys }} 
            options={question.options.map((cityOption) => ({
              value: cityOption.label || cityOption,
              label: cityOption.label || cityOption,
            }))}
            onChange={(selectedOption) => handleCitySelection(selectedOption)}
            placeholder="Select City"
          />
          {renderedDistricts && (
            <Select
              id="district"
              name="district"
               value={renderedDistricts.find((district) => district.value === selectedDistricts)}
              options={renderedDistricts.map((district, index) => ({
                value: district.props.value,
                label: district.props.children,
              }))}
              onChange={(selectedOption) => {
                setSelectedDistricts(selectedOption.value);
                setIsOptionSelected(true);
              }}
              placeholder="Select District"
            />
          )}
        </>
      );
    }  
    return (
      <>
        {question.options.map((option, index) => (
          <div key={index} className='optionContainers'>
            <Field
              type="radio"
              id={`${question.id}-${index}`}
              name={question.id}
              value={option.label || option}
              checked={formValues[question.id] === (option.label || option)}
              onChange={() => handleRadioChange(question.id, option)}
            />
            <label className='radioLabel' htmlFor={`${question.id}-${index}`}>
              {option.label || option}
            </label>
            {selectedSpecific && (option === '기타' || option === '해당 없음') && (
              <Field
                type="text"
                name={`additionalInfo-${question.id}`}
                placeholder="Enter additional information"
                onChange={handleTextChange}
              />
            )}
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <div className='formContainer'>
        <NavigationBar/>
        <Formik
          initialValues={{
            ...generateInitialValues(questionSets),
            city: '', 
            district: '', 
          }}
          validationSchema={generateValidationSchema(questionSets)}
          onSubmit={handleSubmit}>
          <Form>
            {currentSetIndex < questionSets.length && !showPreview && (
              <div className='estimateMain'>
                <div className='allContainers'>
                  <p>{questionSets[currentSetIndex][currentQuestionIndex].text}</p>
                  {renderSelectComponents()}
                </div>
                <ErrorMessage name={questionSets[currentSetIndex][currentQuestionIndex].id} component="div" />
                <div className='btns'>
                  <button className='submitBtns' type="button" onClick={handlePreview}>
                    이전
                  </button>
                  {!lastQuestion ? (
                    <button className='nextBtns'type="button" onClick={handleNextQuestion} disabled={!isOptionSelected}>다음</button>
                  ) : (
                    <button  className='nextBtns'type="button" onClick={handleSubmit}>제출하기</button>
                  )}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};
  export default Waterproof;
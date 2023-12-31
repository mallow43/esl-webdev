import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Resources from './pages/Resources';
// import ErrorPage from './pages/Error';
import Syllabus from './pages/Syllabus';
import { text } from './content/Content.jsx';
import Navbar from './components/Navbar';
import Class from './components/Class';

function App() {
    const initLanguage = () => {
        if (localStorage.getItem('english') === null) {
            localStorage.setItem('english', JSON.stringify({ english: true }));
            return true;
        } else {
            console.log('else' + JSON.parse(localStorage.getItem('english')).english);
            return JSON.parse(localStorage.getItem('english')).english;
        }
    };
    console.log(initLanguage());
    const getContent = (english) => {
        if (english) {
            return text.en;
        } else {
            return text.es;
        }
    };

    const [language, setLanguage] = useState({ english: initLanguage(), content: getContent(initLanguage()) });

    let exercisesES = [];
    {
        // eslint-disable-next-line
        text.es.syllabus.classes.map((b) => {
            b.exercises.map((r) => {
                exercisesES.push(r);
            });
        });
    }

    let exercisesEN = [];
    {
        // eslint-disable-next-line
        text.en.syllabus.classes.map((b) => {
            b.exercises.map((r) => {
                exercisesEN.push(r);
            });
        });
    }

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Navbar getContent={getContent} language={language} setLanguage={setLanguage} />

                <Routes>
                    {text.en.syllabus.classes.map((r) => {
                        return <Route path={'/' + r.url} element={<Class class={r} text={text.en.syllabus} />} />;
                    })}

                    {text.es.syllabus.classes.map((r) => {
                        return <Route path={'/' + r.url} element={<Class class={r} text={text.es.syllabus} />} />;
                    })}
                    {exercisesES.map((exercise) => {
                        return (
                            <Route
                                path={'/' + exercise.url}
                                element={<Class class={exercise} text={text.es.syllabus} />}
                            />
                        );
                    })}
                    {exercisesEN.map((exercise) => {
                        return (
                            <Route
                                path={'/' + exercise.url}
                                element={<Class class={exercise} text={text.es.syllabus} />}
                            />
                        );
                    })}
                    <Route path="/syllabus" element={<Syllabus language={language} />} />
                    <Route path="/resources" element={<Resources language={language} />} />
                    <Route path="/home" element={<Home language={language} getContent={getContent} />} />
                    <Route path="/" element={<Home language={language} getContent={getContent} />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

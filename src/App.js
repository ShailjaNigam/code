import { useState, useEffect } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Components/Navbar';
import spinner from './spinner.svg';
import toast, {Toaster} from 'react-hot-toast';
import { languageOptions } from './languageOptions';
import {compileSourceCode} from './API/compileAPI';

const javascriptDefault = 
`#include<stdio.h>
int main() {
    int intType;
    float floatType;
    double doubleType;
    char charType;

    // sizeof evaluates the size of a variable
    printf("Size of int: %zu bytes\n", sizeof(intType));
    printf("Size of float: %zu bytes\n", sizeof(floatType));
    printf("Size of double: %zu bytes\n", sizeof(doubleType));
    printf("Size of char: %zu byte\n", sizeof(charType));
    
    return 0;
}
`;

function App() {

	// State variable to set users source code
	const [code, setCode] = useState(javascriptDefault);

	// State variable to set editors default language
	const [language, setLanguage] = useState(languageOptions[5]);
	//const [langID, setLangID] = useState("")

	// State variable to set editors default theme
	const [userTheme, setUserTheme] = useState("vs-dark");

	// State variable to set editors default font size
	const [fontSize, setFontSize] = useState(20);

	// State variable to set users input
	const [customInput, setCustomInput] = useState("");

	// State variable to set users output
	const [userOutput, setUserOutput] = useState("");

	// Loading state variable to show spinner
	// while fetching data
	const [loading, setLoading] = useState(false);

	const options = {
		fontSize: fontSize
	}

	useEffect(() => {
        console.log('Page loaded ID: ', language.id);
    }, []);

	// Function to call the compile endpoint
	const compile = async() => {

		

		const formData = {
			language_id: language.id,
			source_code: btoa(code),
			stdin: btoa(customInput),
		}
		
		try {
			const res = await compileSourceCode(formData);
			setUserOutput(res.data)
			console.log(res.data);

		} catch(error) {
			console.log(error);
		}
	}

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}

	return (
		<div className="App">
			<Navbar
				userLang={language} setUserLang={setLanguage}
				userTheme={userTheme} setUserTheme={setUserTheme}
				fontSize={fontSize} setFontSize={setFontSize}
			/>
			<div className="main">
				<div className="left-container">
					<Editor
						options={options}
						height="calc(100vh - 50px)"
						width="100%"
						theme={userTheme}
						language={language}
						defaultLanguage="C"
						onChange={(value) => { setCode(value) }}
					/>
					<button className="run-btn" onClick={() => compile()}>
						Run
					</button>
				</div>
				<div className="right-container">
					<h4>Input:</h4>
					<div className="input-box">
						<textarea id="code-inp" onChange=
							{(e) => setCustomInput(e.target.value)}>
						</textarea>
					</div>
					<h4>Output:</h4>
					{loading ? (
						<div className="spinner-box">
							<img src={spinner} alt="Loading..." />
						</div>
					) : (
						<div className="output-box">
							<pre>{userOutput}</pre>
							<button onClick={() => { clearOutput() }}
								className="clear-btn">
								Clear
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Components/Navbar';
import { languageOptions } from './languageOptions';
import {compileSourceCode} from './API/compileAPI';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

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
	const [language, setLanguage] = useState(languageOptions[4]);
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
		setCode(javascriptDefault);
    }, []);

	// Function to call the compile endpoint
	const compile = async() => {

		
		setLoading(true);
		const formData = {
			language_id: language.id,
			source_code: btoa(code),
			stdin: btoa(customInput),
		}
		
		try {
			const res = await compileSourceCode(formData);
			setLoading(false);

			if (res.status === 200) {
				
					setUserOutput(res.data);
					toast.success("Compilation Successfull...");
			} else {
				
					setUserOutput('Complilation Error!');
					toast.error("Compilation Error!");

			}
			
			
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
<>
			<Toaster
			position="top-right"
			reverseOrder={false}
			gutter={8}
			containerClassName=""
			containerStyle={{}}
			toastOptions={{
				// Define default options
				className: '',
				duration: 5000,
				style: {
				background: 'white',
				color: 'black',
				},

				// Default options for specific types
				success: {
				duration: 3000,
				theme: {
					primary: 'green',
					secondary: 'black',
				},
				},
				error: {
					duration: 3000,
					theme: {
						primary: 'red',
						secondary: 'black',
					},
					},
			}}
			/>

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
						language={language.value}
						defaultLanguage="c"
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
        						<div className="spinner"></div>
   							</div>
						) : (
    						<div className="output-box">
        						<pre>{userOutput}</pre>
        						<button onClick={() => { clearOutput() }} className="clear-btn">
            					Clear
        						</button>
    						</div>
					)}

				</div>
			</div>
		</div>
	</>
	);
}

export default App;

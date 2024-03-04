import React from 'react';
import Select from 'react-select';
import './Navbar.css';
import { languageOptions } from '../languageOptions';

const Navbar = ({ userLang: language, setUserLang: setLanguage, userTheme,
	setUserTheme, fontSize, setFontSize, code }) => {
	const languages = languageOptions;
	const themes = [
		{ value: "vs-dark", label: "Dark" },
		{ value: "light", label: "Light" },
	]

	// Function to handle code file download
    const downloadCodeFile = () => {
        let fileExtension = ".txt"; // Default file extension
        
        // Determine file extension based on selected language
        switch (language.value) {
            case "c":
                fileExtension = ".c";
                break;
            case "cpp":
                fileExtension = ".cpp";
                break;
            case "java":
                fileExtension = ".java";
                break;
            case "python":
                fileExtension = ".py";
                break;
            default:
                fileExtension = ".txt"; // Default to .txt if language is not recognized
                break;
        }

        const element = document.createElement("a");
        const file = new Blob([code], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `code${fileExtension}`; // Set file name with extension
        document.body.appendChild(element); // Required for this to work in Firefox
        element.click();
    };

	return (
		<div className="navbar">
			<h1>Code Editor</h1>
			<Select options={languages} value={language.value}
				onChange={(e) => {
					setLanguage(e);
					console.log("id: ", e.id);
				}}
				
				placeholder={language.value} 
				styles={{
					control: (provided) => ({
						...provided,
						minWidth: '200px',
					}),
				}}/>
			<Select options={themes} value={userTheme}
				onChange={(e) => setUserTheme(e.value)}
				placeholder={userTheme} />
			<label>Font Size</label>
			<input type="range" min="18" max="30"
				value={fontSize} step="2"
				onChange={(e) => { setFontSize(e.target.value) }} />
				  {/* Your existing JSX code */}
				  <div className="download-btn-container">
                <button onClick={downloadCodeFile} className="download-btn">
                    Download Code
                </button>
            </div>
            {/* Your existing JSX code */}
		</div>
	)
}

export default Navbar

import React from 'react';
import Select from 'react-select';
import './Navbar.css';
import { languageOptions } from '../languageOptions';

const Navbar = ({ userLang: language, setUserLang: setLanguage, userTheme,
	setUserTheme, fontSize, setFontSize }) => {
	const languages = languageOptions;
	const themes = [
		{ value: "vs-dark", label: "Dark" },
		{ value: "light", label: "Light" },
	]
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
		</div>
	)
}

export default Navbar

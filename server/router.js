const express = require("express");
const router = new express.Router();
const axios = require("axios");

const checkStatus = async (token, res) => {
    const options = {
        method: "GET",
        url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            'X-RapidAPI-Key': '4c2cf46294mshde1e56de49f4c7bp1e6f52jsn127d71bae2f9',
        },
    };
    try {
        let response = await axios.request(options);
        let statusId = response.data.status?.id;

        if (statusId === 1 || statusId === 2) {
            setTimeout(() => {
                checkStatus(token, res);
            }, 2000);
            return;
        } else {
            //setProcessing(false);
            const output = atob(response.data.stdout);
            res.status(200).json(output);
           // setOutputDetails(response.data);
           // showSuccessToast(`Compiled Successfully!`);
            console.log("output: ", response.data.stdout);
            return;
        }
    } catch (err) {
        console.log("err", err);
        res.status(400).json({error: 'Internal Server Error!' });
        //setProcessing(false);
        //showErrorToast();
    }
};

router.post("/compile", async (req, res) => {

    const formData = {
        language_id: req.body.language_id,
        source_code: req.body.source_code,
        stdin: req.body.stdin
    };

    console.log(formData);

    const options = {
        method: "POST",
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: "true",
            fields: "*"
        },
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            'X-RapidAPI-Key': "4c2cf46294mshde1e56de49f4c7bp1e6f52jsn127d71bae2f9"
        },
        data: formData,

    };

    try {
        const response = await axios.request(options);
        console.log("output: " , response.data);
        const token = response.data.token;
        // Call checkStatus function with res object
        await checkStatus(token, res);
    } catch (err) {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        console.log("status: ", status);
        console.log(error);

        if (status === 429) {
            console.log("Too Many Requests", status);
            
            res.status(201).json({data: 'Quota of 100 requests exceeded for today'}, {catch_err: error})
        } else {
            res.status(400).json({error: 'Internal Server Error!' });
        }
    }
});

module.exports = router;


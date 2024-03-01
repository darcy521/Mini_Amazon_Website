import React, { useState } from 'react';

export default function CallPython() {
    const [response, setResponse] = useState('');

    const callBackend = async () => {
        const response = await fetch('/run-python', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: "Hello from React" }), // Send data as needed
        });

        const body = await response.json();
        console.log('body: ', body);
        setResponse(body.output);
    }

    return (
        <div>
            <button onClick={callBackend}>Run Python Code</button>
            <p>Python Response: {response}</p>
        </div>
    );
}



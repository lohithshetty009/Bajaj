import React, { useState } from 'react';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('your_backend_url/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: JSON.parse(input) })
            });
            const result = await res.json();
            setResponse(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder='Enter JSON' 
                />
                <button type="submit">Submit</button>
            </form>

            {response && (
                <div>
                    <h2>Response</h2>
                    <select 
                        multiple 
                        value={selectedOptions} 
                        onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}
                    >
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>

                    <div>
                        {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                        {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                        {selectedOptions.includes('highest_lowercase_alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

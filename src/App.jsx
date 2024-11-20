import { useEffect, useState } from 'react';

function App() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

    const generateRandomString = (length, includeNumbers, includeSpecialChars) => {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) {
            characters += '0123456789';
        }
        if (includeSpecialChars) {
            characters += '!@#$%^&*()_+[]{}|;:,.<>?';
        }
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const updatePassword = () => {
        setPassword(generateRandomString(length, includeNumbers, includeSpecialChars));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
    };

    useEffect(() => {
        updatePassword();
    }, [length, includeNumbers, includeSpecialChars]);

    return (
        <div className="bg-gray-900 flex items-center justify-center h-screen">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={password}
                        className="bg-white text-orange-500 p-2 rounded-lg w-64"
                        readOnly
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={copyToClipboard}>
                        Copy
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={length}
                            className="slider"
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <span className="text-orange-500">Length ({length})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="numbers"
                            className="form-checkbox"
                            checked={includeNumbers}
                            onChange={() => setIncludeNumbers(!includeNumbers)}
                        />
                        <label htmlFor="numbers" className="text-orange-500">Numbers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="characters"
                            className="form-checkbox"
                            checked={includeSpecialChars}
                            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
                        />
                        <label htmlFor="characters" className="text-orange-500">Characters</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

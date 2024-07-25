import React, { useState, useEffect } from 'react';
import './validateclaim.css';

const ValidateClaim = () => {
    const [selectedOption, setSelectedOption] = useState('option1');
    const [fillingType, setFillingType] = useState('SilverAmalgam');
    const [price, setPrice] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);
    }, []);

    const fillings = {
        SilverAmalgam: { minPrice: 200, maxPrice: 300 },
        ToothColoredComposite: { minPrice: 240, maxPrice: 400 },
        CastGoldPorcelain: { minPrice: 400, maxPrice: 4650 },
    };

    const handleCheckPrice = () => {
        setLoading(true);
        setTimeout(() => {
            const filling = fillings[fillingType];
            const parsedPrice = parseFloat(price);

            if (isNaN(parsedPrice)) {
                alert('Please enter a valid price.');
                setLoading(false);
                return;
            }

            const isPriceValid = parsedPrice >= filling.minPrice && parsedPrice <= filling.maxPrice;
            setIsValid(isPriceValid);
            setLoading(false);
        }, 2000); // This would instead act as an async call to my 'auth.js' file where we could validate these prices on the smart contracts
    };

    const handleButtonClick = (option) => {
        setSelectedOption(option);
        // Reset validation when changing options
        setIsValid(null);
        setPrice('');
    };

    return (
        <div id="pagecontainer">
            <div id="validateContainer">
                <h1 id="mainHeadText">Submit a Claim</h1>
            </div>
            <div id="informationContainer" className={`notes ${showContent ? 'fadeIn' : ''}`}>
                <p id="notesSection">This is a test application to show what the process of validating a claim would look like. In a real deployment, the dental company would provide specific files such as Narratives, 
                    Preoperative radiographs (x-ray), Postoperative radiographs, and other additional supporting documentation. Ensuring a valid cost for this claim would be one small aspect of the entire validation process. </p>
            </div>
            <div>
                <div id="buttonContainer" className={`button-container ${showContent ? 'fadeInDelay' : ''}`}>
                    <button className="windowButtons" onClick={() => handleButtonClick('option1')}>Fillings</button>
                    <button className="windowButtons" onClick={() => handleButtonClick('option2')}>Crowns</button>
                    <button className="windowButtons" onClick={() => handleButtonClick('option3')}>Cleanings</button>
                </div>
                <div className={`content-wrapper ${showContent ? 'fadeInDelay' : ''}`}>
                    <div className="content-header">
                        <h2>
                            {selectedOption === 'option1' ? 'Dental Fillings' : 
                            selectedOption === 'option2' ? 'Dental Crowns' : 
                            'Dental Cleanings'}
                        </h2>
                    </div>
                    <div className="content-body">
                        {selectedOption === 'option1' && (
                        <div>
                            <div>
                                <label htmlFor="fillingType">Select Filling Type: </label>
                                <select
                                    id="fillingType"
                                    value={fillingType}
                                    onChange={(e) => setFillingType(e.target.value)}
                                    className="dropdown-select"
                                >
                                    <option value="SilverAmalgam">Silver Amalgam</option>
                                    <option value="ToothColoredComposite">Tooth Colored Composite</option>
                                    <option value="CastGoldPorcelain">Cast Gold Porcelain</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price">Enter Price: </label>
                                <input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="price-input"
                                />
                            </div>
                            <button id="buttonCheckPrice" onClick={handleCheckPrice}>Check Price</button>
                            <div className="result">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : isValid === null ? (
                                    <p>Select your filling type and procedure cost.</p>
                                ) : isValid ? (
                                    <p className="valid">The claim was successful.</p>
                                ) : (
                                    <p className="invalid">The claim is flagged and currently under review.</p>
                                )}
                            </div>
                        </div>
                        )}
                        {selectedOption === 'option2' && <div>Whoops! This is still being added.</div>}
                        {selectedOption === 'option3' && <div>Whoops! This is still being added.</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValidateClaim;

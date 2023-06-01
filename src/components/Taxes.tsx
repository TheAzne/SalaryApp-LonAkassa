
import React, { useCallback, useEffect, useState } from "react";

type ResponseType = {
    results: Array<{ [key: string]: any }>;
};

type savedResultType = {
    key: number;
    result: ResponseType | { [key: string]: string };
    inputValue: string;
};


const Taxes = () => {

    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState<ResponseType | null | string | { [key: string]: string }>(null);
    const [tableNr, setTableNr] = useState(29);
    const [response, setResponse] = useState<null | ResponseType>(null);
    const [savedResults, setSavedResults] = useState<savedResultType[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTableNr(parseInt(event.target.value));
    }


    const handleClick = () => {
        const inputNumber = parseFloat(inputValue);

        if (isNaN(inputNumber)) {
            // if wrong number
            setResult("Fel! Prova igen med andra siffror!");
            return;
        }

        const dataObj =
            response &&
            response?.results.find((obj) => {
                const from = parseFloat(obj["inkomst fr.o.m."]);
                const to = parseFloat(obj["inkomst t.o.m."]);

                return inputNumber >= from && inputNumber <= to;
            });

        if (dataObj) {
            setResult(dataObj);
        } else {
            setResult("Fel. Prova igen!");
        }
    };

    const getTaxApi = useCallback(
        async function () {
            const url = `https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95?tabellnr=${tableNr}&%C3%A5r=2023&_limit=500`;
            const response = await fetch(url);
            const data = await response.json();
            setResponse(data);
        },
        [tableNr]
    );

    useEffect(() => {
        getTaxApi();
    }, [getTaxApi]);


    const handleSaveResult = () => {
        if (result !== null && typeof result === "object") {
            setSavedResults((prevResult) => [
                ...prevResult,
                { key: savedResults.length, result, inputValue },
            ]);
        }
    };

    const options = [];
    for (let i = 29; i <= 42; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
    }

    return (
        <div className="mx-10 pt-20">
            <h1 className="text-center text-4xl font-semibold mb-8 text-[#2a1925]">Räkna Lön</h1>
            <div className="flex flex-row items-stretch h-[60vh]">
                <div className="flex flex-col items-start mx-20 overflow-auto">
                    <label htmlFor="tableNum" className="text-[17px] text-white font-semibold mb-1">Skattetabell</label>
                    <select
                        id="tableNum"
                        onChange={handleSelectOnChange}
                        value={tableNr}
                        className="mb-5 py-2 px-4 rounded border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                        {options}
                    </select>
                    <label htmlFor="income" className="text-sm font-semibold mb-1 text-[17px] text-white">Fyll i månadslön före skatt:</label>
                    <input
                        type="text"
                        id="income"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="mb-5 py-2 px-4 rounded border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900" />
                    <button
                        onClick={handleClick}
                        className="py-2 px-4 rounded bg-blue-900 text-white 
                hover:bg-blue-600 transition-colors duration-200 ease-in-out">
                        Beräkna
                    </button>
                </div>
                {/* <label htmlFor="tableNum">Tabellnr: &nbsp;</label>
            <select id="tableNum" onChange={handleSelectOnChange} value={tableNr}>
                {options}
            </select>
            <p>Fyll i månadslön före skatt &nbsp;
                <input type="text" value={inputValue} onChange={handleInputChange} />
            </p>
            <button onClick={handleClick}>Beräkna</button> */}
                {result != null && typeof result === "object" ? (
                    <div className="flex align-center pt-20 mx-20 items-center flex-col py-[50px]">
                        {/* <p>Lön: {inputValue} </p>
                    <p>Skatt: {parseInt((result as { [key: string]: string })["kolumn 1"])}</p>
                    <p>Vald skattetabell: {tableNr}</p>
                    <p>Lön efter skatt: {parseFloat(inputValue) - parseInt((result as { [key: string]: string })["kolumn 1"])}</p>
                    <button onClick={handleSaveResult}>Spara resultat</button> */}
                        <table className="border-collapse text-center mx-2 bg-white">
                            <thead>
                                <tr>
                                    <th className="p-2 px-5 border bg-gray-300">Lön</th>
                                    <th className="p-2 px-5 border bg-gray-300">Skatt</th>
                                    <th className="p-2 border bg-gray-300">Skattetabell</th>
                                    <th className="p-2 border bg-gray-300">Lön efter skatt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="font-semibold">
                                    <td className="p-2 px-5 border">{inputValue}</td>
                                    <td className="p-2 px-5 border">{parseInt((result as { [key: string]: string })["kolumn 1"])}</td>
                                    <td className="border">{tableNr}</td>
                                    <td className="p-2 border">{parseFloat(inputValue) - parseInt((result as { [key: string]: string })["kolumn 1"])}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={handleSaveResult} className="flex mt-5 w-auto p-2 text-[18px] h-12 items-center justify-center bg-blue-800
                     text-white hover:bg-blue-600 rounded transition-colors duration-200 ease-in-out">Spara resultat</button>

                        {/* <div>
                        {savedResults.length > 0 && (
                            <>
                                <h2>Sparad resultat</h2>
                                <ul>
                                    {savedResults.map(({ key, result, inputValue }) => (
                                        <li key={key}>
                                            {inputValue} - {(result as { [key: string]: string })["kolumn 1"]} ={" "}
                                            {parseFloat(inputValue) - parseInt((result as { [key: string]: string })["kolumn 1"])}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div> */}
                        <div className="flex flex-col items-center pt-20 py-20">
                            {savedResults.length > 0 && (
                                <>
                                    <h2 className="text-[25px] font-semibold text-[#f3ff17]">Sparad resultat</h2>
                                    <table className="table-auto w-full text-center border-collapse">
                                        <thead >
                                            <tr>
                                                <th className="border p-2 px-5 bg-gray-300">Lön</th>
                                                <th className="border p-2 px-5 bg-gray-300">Skatt</th>
                                                <th className="border p-2 bg-gray-300">Skattetabell</th>
                                                <th className="border p-2 bg-gray-300">Lön efter skatt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {savedResults.map(({ key, result, inputValue }) => (
                                                <tr key={key} className="bg-white font-semibold">
                                                    <td className="border p-2 px-5 ">{inputValue}</td>
                                                    <td className="border p-2 px-5">{parseInt((result as { [key: string]: string })["kolumn 1"])}</td>
                                                    <td className="border">{tableNr}</td>
                                                    <td className="border p-2 px-5">{parseFloat(inputValue) - parseInt((result as { [key: string]: string })["kolumn 1"])}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>{result}</div>
                )}
            </div>

        </div>
    );
}

export default Taxes;
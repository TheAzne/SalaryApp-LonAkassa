import React, { useState } from "react";

const Akassa = () => {
    const [inputValue, setInputValue] = useState("");
    const [monthlyPayments, setMonthlyPayments] = useState<number[]>([]);
    const [dailyPayments, setDailyPayments] = useState<number[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleClick = () => {
        const inputNumber = parseFloat(inputValue);
        const days = [100, 200, 300];

        const calculateMonthlyPayment = (inputNumber: number, days: number) => {
            if (days === 100) {
                if (inputNumber >= 33000) {
                    return 26400;
                } else if (inputNumber > 0 && inputNumber < 33000) {
                    return inputNumber * 0.8;
                }
            } else if (days === 200) {
                if (inputNumber >= 27500) {
                    return 22000;
                } else if (inputNumber > 0 && inputNumber <= 27000) {
                    return inputNumber * 0.8;
                }
            } else if (days === 300) {
                if (inputNumber >= 33000) {
                    return 22000;
                } else if (inputNumber > 0 && inputNumber < 33000) {
                    return inputNumber * 0.7;
                }
            }
            return 0;
        };

        const calculateDailyPayment = (inputNumber: number, days: number) => {
            if (days === 100) {
                if (inputNumber >= 33000) {
                    return 1200;
                } else if (inputNumber > 0 && inputNumber < 33000) {
                    return (inputNumber * 0.8) / 22;
                }
            } else if (days === 200) {
                if (inputNumber >= 27500) {
                    return 1000;
                } else if (inputNumber > 0 && inputNumber <= 27000) {
                    return (inputNumber * 0.8) / 22;
                }
            } else if (days === 300) {
                if (inputNumber >= 31500) {
                    return 1000;
                } else if (inputNumber > 0 && inputNumber < 31500) {
                    return (inputNumber * 0.7) / 22;
                }
            }
            return 0;
        };

        const monthlyPaymentList = days.map((day) => calculateMonthlyPayment(inputNumber, day));
        const dailyPaymentList = days.map((day) => calculateDailyPayment(inputNumber, day));
        setMonthlyPayments(monthlyPaymentList);
        setDailyPayments(dailyPaymentList);
    };

    return (
        <div className="flex justify-center mb-20">
            <div className="p-3 flex flex-col items-center ">
                <h1 className="flex justify-center text-6xl p-5 font-semibold mb-8 text-[#2a1925]">Information om Akassa</h1>
                <p className="flex text-white pt-5 pl-2 p-6 w-[40%] text-center justify-center flex-col">
                    <p className="text-3xl font-semibold text-[#c9c426] pb-2">Har du varit medlem längre än 12 månader?</p>
                    <p className="pb-4 text-[17px]">Du som har varit medlem i minst 12 månader och uppfyller ett arbetsvillkor under tiden som medlem har rätt till ersättning baserad på din inkomst. Du kan få upp till 80 procent av din tidigare inkomst, men högst 26 400 kronor per månad före skatt.
                        För att kunna få det högsta beloppet behöver du ha haft en månadsinkomst på minst 33 000 kronor före skatt under ett helt år.</p>
                    <p className="text-3xl font-semibold text-[#c9c426] pb-4">Har du varit medlem kortare tid än 12 månader?</p>
                    Du som har varit medlem kortare än 12 månader, uppfyller ett arbetsvillkor och har fyllt 20 år får en så kallad grundersättning.

                    Grundersättningen är max 11 220 kronor per månad före skatt. För att få den summan måste du ha arbetat heltid utan frånvaro i 12 månader. Om du inte har arbetat heltid eller arbetat kortare tid än 12 månader blir ersättningen lägre än 11 220 kronor.

                    När du har varit medlem i 12 månader kan vi i vissa fall pröva om du har rätt till en högre ersättning. Om du vill veta mer kan du kontakta oss.

                    <p className="text-3xl font-semibold text-[#c9c426] pb-4 pt-4">Du får ersättning i 300 dagar</p>

                    <p className="pb-4 text-[17px]">Du får normalt 300 ersättningsdagar. Vi betalar ut 5 dagar per vecka om du är helt arbetslös. Det innebär att du får ersättning i cirka 60 veckor.

                        Om du har barn under 18 år när du har använt dina 300 dagar får du ytterligare 150 dagar. Om du inte har vårdnad om dina barn har du fortfarande rätt till de extra 150 dagarna, men du behöver lämna in ett intyg som styrker att du har barn.

                        Innan du kan börja ta ut dina dagar måste du först göra 2 karensdagar, vilket innebär att du inte får ersättning under de första 2 dagarna av din arbetslöshet.
                    </p>
                    <p className="text-3xl font-semibold text-[#c9c426] pb-4 pt-4">Ersättningen blir lägre med tiden</p>
                    <table className="border-collapse w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border border-white text-left text-white font-semibold">Antal dagar</th>
                                <th className="py-2 px-4 border border-white text-left text-white font-semibold">Procentuell ersättning</th>
                                <th className="py-2 px-4 border border-white text-left text-white font-semibold">Maximal ersättning per månad</th>
                                <th className="py-2 px-4 border border-white text-left text-white font-semibold">Maximal ersättning per dag</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border border-white">De första 2 dagarna (karens)</td>
                                <td className="py-2 px-4 border border-white">0%</td>
                                <td className="py-2 px-4 border border-white">-</td>
                                <td className="py-2 px-4 border border-white">-</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-white">Dag 1-100</td>
                                <td className="py-2 px-4 border border-white">80%</td>
                                <td className="py-2 px-4 border border-white">26 400 kr</td>
                                <td className="py-2 px-4 border border-white">1 200 kr</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-white">Dag 101-200</td>
                                <td className="py-2 px-4 border border-white">80%</td>
                                <td className="py-2 px-4 border border-white">22 000 kr</td>
                                <td className="py-2 px-4 border border-white">1 000 kr</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-white">Dag 201-450</td>
                                <td className="py-2 px-4 border border-white">70%</td>
                                <td className="py-2 px-4 border border-white">22 000 kr</td>
                                <td className="py-2 px-4 border border-white">1 000 kr</td>
                            </tr>
                        </tbody>
                    </table>


                </p>
                <div className="flex flex-col items-center text-center ">
                    <label htmlFor="income" className="text-sm font-semibold mb-1 text-[17px] text-white">
                        Fyll i månadslön:
                    </label>
                    <input
                        type="text"
                        id="income"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-[200px] mb-2 py-2 px-4 rounded border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />

                    <button
                        onClick={handleClick}
                        className="w-[200px] py-2 px-4 rounded bg-blue-900 text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out"
                    >
                        Beräkna
                    </button>
                    <div className="flex justify-between flex-row items-center p-5">
                        <table className="w-[40%] mt-5 table-fixed mx-auto">
                            <thead>
                                <tr className="bg-gray-800">
                                    <th className="py-2 px-2 text-white">Dagar</th>
                                    <th className="py-2 px-2 text-white">Månadsbetalning</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white">
                                    <td className="py-2 px-2">Första två dagarna </td>
                                    <td className="py-2 px-2">0 kr</td>
                                </tr>
                                {monthlyPayments.map((payment, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                                        <td className="py-2 px-2">{`${index * 100 + 1}-${(index + 1) * 100}`}</td>
                                        <td className="py-2 px-2">{payment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} kr/månad</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {dailyPayments.length > 0 && (
                            <table className="w-[40%] mt-5 table-fixed mx-auto">
                                <thead>
                                    <tr className="bg-gray-800">
                                        <th className="py-2 px-2 text-white">Dagar</th>
                                        <th className="py-2 px-2 text-white">Daglig betalning</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="py-2 px-2">Första två dagarna </td>
                                        <td className="py-2 px-2">0 kr</td>
                                    </tr>
                                    {dailyPayments.map((payment, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                                            <td className="py-2 px-2">{`${index * 100 + 1}-${(index + 1) * 100}`}</td>
                                            <td className="py-2 px-2">{payment.toFixed(0)} kr/dag</td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Akassa;






import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MonthlyTable() {
    const [tableData, setTableData] = useState([]);

    // Function to format date into mm/dd/yy format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const dd = String(date.getDate()).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${mm}/${dd}/${yy}`;
    };

    useEffect(() => {
        // Check if it's the initial render
        let isMounted = true;
        if (isMounted) {
            axios.get('http://localhost:3001/client-reports')
                .then(response => {
                    // Log the returned data
                    console.log('Returned data:', response.data);
                    // Update the tableData state with the fetched data
                    setTableData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // Handle error if necessary
                });
        }

        // Clean-up function to prevent memory leaks
        return () => {
            isMounted = false;
        };
    }, []); // Empty dependency array to run this effect only once after initial render

    return (
        <div>
            <h1>Monthly Table</h1>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Post Date</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Amount</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Balance</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Category</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Type</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {tableData.map((transaction, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'hover:bg-gray-50' : ''}>
                                <td className="px-6 py-4 text-center">{formatDate(transaction.post_date)}</td>
                                <td className="px-6 py-4 text-left">{transaction.description.replace(/^"(.*)"$/, '$1')}</td>
                                <td className="px-6 py-4 text-center">{transaction.amount}</td>
                                <td className="px-6 py-4 text-center">{transaction.balance}</td>
                                <td className="px-6 py-4 text-center">{transaction.category_id}</td>
                                <td className="px-6 py-4 text-center">
                                <div className="flex gap-2">
    <span className={`inline-flex items-center gap-1 rounded-full ${transaction.details === 'debit' ? 'bg-red-50' : 'bg-green-50'} px-2 py-1 text-xs font-semibold ${transaction.details === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
        {transaction.details === 'debit' ? 'Expense' : 'Income'}
    </span>
</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-end gap-4">
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

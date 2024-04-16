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
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>Post Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Category ID</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((transaction, index) => (
                        <tr key={index}>
                            <td>{formatDate(transaction.post_date)}</td>
                            <td>{transaction.description.replace(/^"(.*)"$/, '$1')}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.balance}</td>
                            <td>{transaction.category_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

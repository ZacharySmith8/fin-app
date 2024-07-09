import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import EditPopUp from './EditPopUp';
import formatDate from '../helpers/formatDate';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "../../src/ag-grid-theme-builder.css"

// function FilterSection() {
  
//   return (
//     <section className="flex gap-5 max-md:flex-wrap">
//       <div className="flex flex-col justify-center text-base whitespace-nowrap text-slate-800">
//         <button className="flex gap-2.5 p-2.5 bg-white rounded-md border border-solid border-slate-300">
//           <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5bfde453f865297704af1ff59ae0da1133ac4da2b22f66ff27fab3b0163f479b?apiKey=abb1fedeee794764b1037f0e37be0f2a&" className="shrink-0 w-5 aspect-square" alt="Filter icon" />
//           <span className="my-auto">Filter</span>
//         </button>
//       </div>
//       <div className="flex flex-col justify-center text-xs text-slate-500">
//         <div className="flex gap-2.5 p-2.5 bg-violet-50 rounded-md">
//           <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb90c5e7791dc519d5af2bad140a4070b5cef9bdfc34f55545ca5ab074813ec7?apiKey=abb1fedeee794764b1037f0e37be0f2a&" className="shrink-0 w-5 aspect-square" alt="Search icon" />
//           <span className="flex-auto my-auto">Search Users by Name, Email or Date</span>
//         </div>
//       </div>
//     </section>
//   );
// }

// function UserRow({ user, columns, onEdit }) {
//   return (
//     <tr>
//       {columns.map((col) => (
//         col !== 'description' && (
//           <td key={col} className="px-4 py-2 text-sm">
//             {col === 'post_date' ? (
//               <div className="flex items-center gap-5">
//                 <div>
//                   <div className="font-medium text-slate-800">{formatDate(user[col])}</div>
//                   <div className="mt-1 text-slate-500">{user.description}</div>
//                 </div>
//               </div>
//             ) : (
//               user[col]
//             )}
//           </td>
//         )
//       ))}
//       <td>
//         <button onClick={() => onEdit(user)}>Edit</button>
//       </td>
//     </tr>
//   );
// }

function MonthlyTable() {

 
}



  // const groupDataByMonth = (data) => {
  //   return data.reduce((acc, item) => {
  //     const month = dayjs(item.post_date).format('YYYY-MM');
  //     if (!acc[month]) acc[month] = [];
  //     acc[month].push(item);
  //     return acc;
  //   }, {});
  // };

  // const sortData = (data, config) => {
  //   const sortedData = [...data];
  //   sortedData.sort((a, b) => {
  //     if (a[config.key] < b[config.key]) {
  //       return config.direction === 'ascending' ? -1 : 1;
  //     }
  //     if (a[config.key] > b[config.key]) {
  //       return config.direction === 'ascending' ? 1 : -1;
  //     }
  //     return 0;
  //   });
  //   return sortedData;
  // };

  // const requestSort = (key) => {
  //   let direction = 'ascending';
  //   if (sortConfig.key === key && sortConfig.direction === 'ascending') {
  //     direction = 'descending';
  //   }
  //   setSortConfig({ key, direction });
  // };

  // const handleShowMoreLess = (month) => {
  //   setRowsPerPage(prevState => ({
  //     ...prevState,
  //     [month]: (prevState[month] === undefined || prevState[month] === 10 ? tableData[month].length : 10)
  //   }));
  // };

  // const handleEdit = (rowData) => {
  //   setEditRowData(rowData);
  // };

  // const handleCancelEdit = () => {
  //   setEditRowData(null);
  // };

  // const handleSave = (updatedData) => {
  //   console.log('Saving data:', updatedData);
  //   const updatedTableData = { ...tableData };
  //   const month = dayjs(updatedData.post_date).format('YYYY-MM');
  //   const index = updatedTableData[month].findIndex(item => item.id === updatedData.id);
  //   if (index !== -1) {
  //     updatedTableData[month][index] = updatedData;
  //     setTableData(updatedTableData);
  //     setEditRowData(null);
  //   }
  // };

  // const sortedMonths = Object.keys(tableData).sort((a, b) => {
  //   if (a < b) return 1;
  //   if (a > b) return -1;
  //   return 0;
  // });

  // const headerMapping = {
  //   category_id: 'Category'
  // };

  // return (
  //   <div className="flex flex-col items-center px-20 pt-12 pb-4  max-md:px-5">
  //     <FilterSection />
  //     {sortedMonths.map(month => (
  //       <section key={month} className="w-full max-w-[1100px] bg-white rounded-lg shadow-md max-md:max-w-full mt-5">
  //         <div className="flex justify-between p-5">
  //           <h2 className="text-xl font-semibold">{dayjs(month).format('MM/YYYY')}</h2>
  //           <button className="flex items-center px-4 py-2.5 text-base font-semibold text-white uppercase bg-indigo-500 rounded-md">
  //             Pay Dues
  //           </button>
  //         </div>
  //         <div className="overflow-x-auto">
  //           <table className="min-w-full bg-white">
  //             <thead className="bg-violet-50">
  //               <tr>
  //                 {tableHeaders.map((header) => (
  //                   header !== 'description' && (
  //                     <th
  //                       key={header}
  //                       className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase cursor-pointer"
  //                       onClick={() => requestSort(header)}
  //                     >
  //                       {headerMapping[header] || header}
  //                       {sortConfig.key === header && (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼')}
  //                     </th>
  //                   )
  //                 ))}
  //                 <th>Action</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {sortData(tableData[month], sortConfig)
  //                 .slice(0, rowsPerPage[month] || 10)
  //                 .map((user, index) => (
  //                   <UserRow
  //                     key={index}
  //                     user={user}
  //                     columns={tableHeaders}
  //                     onEdit={handleEdit}
  //                   />
  //                 ))}
  //             </tbody>
  //           </table>
  //         </div>
  //         <div className="flex justify-center p-4">
  //           <button
  //             onClick={() => handleShowMoreLess(month)}
  //             className="px-4 py-2 text-base font-semibold text-white uppercase bg-indigo-500 rounded-md"
  //           >
  //             {rowsPerPage[month] === tableData[month].length ? 'Show Less' : 'Show More'}
  //           </button>
  //         </div>
  //       </section>
  //     ))}
  //     {editRowData && (
  //       <EditPopUp
  //         rowData={editRowData}
  //         onSave={handleSave}
  //         onCancel={handleCancelEdit}
  //       />
  //     )}
  //   </div>
  // );
// }

export default MonthlyTable;


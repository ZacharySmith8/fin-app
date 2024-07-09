import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const Dashboard = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: 500 }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const DEFAULT_MIN_WIDTH = 100;
  const DESCRIPTION_MIN_WIDTH = DEFAULT_MIN_WIDTH * 3;

  // Fetch data from the API
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.get('http://localhost:3001/client-reports')
        .then(response => {
          console.log('Returned data:', response.data);
          const groupedData = groupDataByMonth(response.data);
          setRowData(groupedData);
          if (response.data.length > 0) {
            const headers = Object.keys(response.data[0]).map(key => ({
              field: key,
              minWidth: key === 'description' ? DESCRIPTION_MIN_WIDTH : DEFAULT_MIN_WIDTH,
              filter: true
            }));
            setColumnDefs(headers);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

 
  const onGridReady = useCallback((params) => {
    params.api.setHeaderHeight(filtersVisible ? 50 : 0);
    params.api.sizeColumnsToFit();
  }, [filtersVisible]);

  const onGridSizeChanged = useCallback((params) => {
    const gridWidth = document.querySelector(".ag-body-viewport").clientWidth;
    let totalColsWidth = 0;
    const columnsToShow = [];
    const columnsToHide = [];
    const allColumns = params.api.getColumns();
    
    if (allColumns && allColumns.length > 0) {
      for (let i = 0; i < allColumns.length; i++) {
        const column = allColumns[i];
        totalColsWidth += column.getMinWidth();
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }

    params.api.setColumnsVisible(columnsToShow, true);
    params.api.setColumnsVisible(columnsToHide, false);

    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }, [window]);

  const onFirstDataRendered = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    
<div className="grid grid-cols-5 grid-rows-5 gap-4">
    <div className="col-span-5 row-span-2 col-start-1 row-start-2">
    <div style={containerStyle}>
      <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
        <div style={gridStyle} className="ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  </div>

    </div>

    <div className="col-start-1 row-start-1 border-2 border-black">
  <div
    class="relative block p-2 overflow-hidden border bg-white border-slate-100 rounded-lg"
    href=""
  >
    <span
      class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    ></span>

    <div class="justify-between sm:flex">
      <div>
        <h5 class="text-xl font-bold text-slate-900">
          Client View Selector
        </h5>
      </div>
    </div>

    <dl class="flex mt-6">
      <div class="flex flex-col-reverse">
      </div>

      <div class="flex flex-col-reverse ml-3 sm:ml-6">
      </div>
    </dl>
  </div>
</div>




    <div className="col-start-2 row-start-1 border-2 border-black">
    <div className="col-start-1 row-start-1 border-2 border-black">
  <div
    class="relative block p-2 overflow-hidden border bg-white border-slate-100 rounded-lg"
    href=""
  >
    <span
      class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    ></span>

    <div class="justify-between sm:flex">
      <div>
        <h5 class="text-xl font-bold text-slate-900">
          Monthly Gain
        </h5>
      </div>
    </div>

    <dl class="flex mt-6">
      <div class="flex flex-col-reverse">
      </div>

      <div class="flex flex-col-reverse ml-3 sm:ml-6">
      </div>
    </dl>
  </div>
</div>
    </div>
    <div className="col-start-3 row-start-1 border-2 border-black">
    <div className="col-start-1 row-start-1 border-2 border-black">
  <div
    class="relative block p-2 overflow-hidden border bg-white border-slate-100 rounded-lg"
    href=""
  >
    <span
      class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    ></span>

    <div class="justify-between sm:flex">
      <div>
        <h5 class="text-xl font-bold text-slate-900">
          Monthly Loss
        </h5>
      </div>
    </div>

    <dl class="flex mt-6">
      <div class="flex flex-col-reverse">
      </div>

      <div class="flex flex-col-reverse ml-3 sm:ml-6">
      </div>
    </dl>
  </div>
</div>
    </div>
    <div className="col-start-4 row-start-1 border-2 border-black">
    <div className="col-start-1 row-start-1 border-2 border-black">
  <div
    class="relative block p-2 overflow-hidden border bg-white border-slate-100 rounded-lg"
    href=""
  >
    <span
      class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    ></span>

    <div class="justify-between sm:flex">
      <div>
        <h5 class="text-xl font-bold text-slate-900">
          Average Daily Balance *For The Month*
        </h5>
      </div>
    </div>

    <dl class="flex mt-6">
      <div class="flex flex-col-reverse">
      </div>

      <div class="flex flex-col-reverse ml-3 sm:ml-6">
      </div>
    </dl>
  </div>
</div>
    </div>
    <div className="col-start-5 row-start-1 border-2 border-black">6</div>
    <div className="row-start-4 border-2 border-black">7</div>
    <div className="row-start-4 border-2 border-black">8</div>
    <div className="row-start-4 border-2 border-black">9</div>
    <div className="row-start-4 border-2 border-black">10</div>
    <div className="row-start-4 border-2 border-black">11</div>
</div>
    

    

    
 
  );
};

export default Dashboard;

// Helper function to group data by month (implement this based on your data structure)
const groupDataByMonth = (data) => {
  // Your logic to group data by month
  return data;
};

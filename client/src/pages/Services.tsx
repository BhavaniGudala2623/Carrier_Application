import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { AgGridReact } from 'ag-grid-react';
import {  useLazyQuery } from '@apollo/react-hooks';
import { GET_ITEMS_QUERY } from "../Queries/index";

interface Item {
  phoneNumber: string | number;
  city: string;
  zip: string | number;
  password: string;
  personName: string;
  dealerName: string;
  id: string;
  email: string;
  street: string;
  state: string;
}

interface ExclusiveStartKey {
  id: string;
}

interface GetAllItemsResponse {
  getAllItems: {
    items: Item[];
    exclusiveStartKey: ExclusiveStartKey | null;
  };
}

const Services: React.FunctionComponent = () => {
  const [fetchItems, { data }] = useLazyQuery<GetAllItemsResponse>(GET_ITEMS_QUERY);
  const [rowData, setRowData] = useState<Item[]>([]);
  const [exclusiveStartKey, setExclusiveStartKey] = useState<{ id: string } | null>(null);
  const [pageSize] = useState(100);

  //(exclusiveStartKey !== null && "__typename" in exclusiveStartKey) ? delete exclusiveStartKey.__typename : null;

  //eslint-disable-next-line no-unused-vars
  const [columnDefs, setColumnDefs] = useState<any>([
    {
      headerName: 'ID',
      maxWidth: 100,
      valueGetter: 'node.id',
      cellRenderer: (props: any) => {
        if (props.value !== undefined) {
          return props.value;
        } else {
          return <img src="https://www.ag-grid.com/example-assets/loading.gif" />;
        }
      }
    },
    {
      headerName: "Delaer Name",
      field: 'dealerName',
      checkboxSelection: true,
      width: 150,
    },
    { headerName: "Person Name", field: 'personName' },
    { headerName: "Person Name", field: 'personName' },
    { headerName: "State", field: 'state', filter: true },
    { headerName: "City", field: 'city', filter: true },
    { headerName: "Email", field: 'email', filter: true },
    { headerName: "Phone Number", field: 'phoneNumber' },

  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log('cellClicked', event);
  }, []);




  const handleScroll = () => {
    const container = document.getElementById('table-container');
    console.log(container);
    if (container && container.scrollTop + container.clientHeight === container.scrollHeight) {
      fetchItems({ variables: { pageSize, exclusiveStartKey } });
    }
  };

  const [next, setNext] = useState(false)
  const handleNext = () => {
    if (data) {
      const { items, exclusiveStartKey } = data.getAllItems;
      setRowData((prevRowData) => [...prevRowData, ...items]);

      if (exclusiveStartKey !== null && "__typename" in exclusiveStartKey) {
        setNext(true);
        fetchItems({ variables: { pageSize, exclusiveStartKey } });
        delete exclusiveStartKey?.__typename;
        setExclusiveStartKey(exclusiveStartKey);
      }
    }
  }


  // useEffect(() => {
  //   fetchItems({ variables: { pageSize, exclusiveStartKey } });
  // }, []);

  useEffect(() => {
    // handleNext();
    fetchItems({ variables: { pageSize, exclusiveStartKey } });
    // console.log(data)
  }, [next]);




  // useEffect(() => {
  //   console.log(data)
  //   if (data) {
  //     const { items, exclusiveStartKey } = data.getAllItems;
  //     setRowData((prevRowData) => [...prevRowData, ...items]);
  //     if (exclusiveStartKey !== null && "__typename" in exclusiveStartKey) {
  //       delete exclusiveStartKey.__typename;
  //     }
  //     setExclusiveStartKey(exclusiveStartKey);
  //     console.log(exclusiveStartKey);
  //   }
  // }, [data]);

  // console.log(exclusiveStartKey)

  return (
    <div className="app-container">
      <Box sx={{ flexGrow: 1, paddingLeft: 30 }}>
        <Paper>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}><b><p>AG GRID</p></b></div>
            <div className="ag-theme-alpine" id="table-container" style={{ height: "80vh", width: "100%" }} onScroll={handleScroll}>
              <button onClick={handleNext} style={{ marginBottom: '1%', backgroundColor: 'blue' }} >To See The Data Click ME</button>
              <AgGridReact
                // ref={gridRef} // Ref for accessing Grid's API
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection="multiple"
                // suppressRowClickSelection={true}
                // groupSelectsChildren={true}
                // rowGroupPanelShow={'always'}
                // pivotPanelShow={'always'}
                // rowModelType='infinite'
                onCellClicked={cellClickedListener}
              // pagination={true}
              />
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  )
}

export default Services











import React from 'react';
import './ViewTable.css'
const ViewTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>No data to display.</div>;
    }

    const columns = Object.keys(data[0]);

    return (
        <table className="data-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td key={column}>{item[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ViewTable;
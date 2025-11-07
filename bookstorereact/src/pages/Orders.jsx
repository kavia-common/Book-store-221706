import React from 'react';
import { Table } from '../components/UI.jsx';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export default function Orders() {
  /** Orders table styled like PHP tables. */
  const columns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Date', accessor: 'date' },
    { header: 'Items', accessor: 'items' },
    { header: 'Total (RM)', accessor: row => row.total.toFixed(2) }
  ];
  const data = [
    { id: 1001, date: '2024-08-21 10:32', items: 3, total: 210.50 },
    { id: 1002, date: '2024-09-02 14:12', items: 1, total: 75.90 }
  ];
  return (
    <blockquote>
      <div className="container" style={{ width: '80%' }}>
        <h2 style={{ marginTop: 0 }}>Orders</h2>
        <Table columns={columns} data={data} />
      </div>
    </blockquote>
  );
}

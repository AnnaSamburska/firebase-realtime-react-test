import React from 'react';
import AntdTable from 'antd/lib/table';
import Tag from 'antd/lib/tag';

const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Fund name',
      dataIndex: 'fund_name',
      key: 'fund_name',
    },
    {
      title: 'Subfund name',
      dataIndex: 'subfund_name',
      key: 'subfund_name',
    },
    {
      title: 'Class',
      dataIndex: 'share_class_name',
      key: 'share_class_name',
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      render: value => {
        const data = new Date(Number(value));
        return  <span>{data.toLocaleString()}</span>
      }
    },
    {
      title: 'Report',
      dataIndex: 'report_status',
      key: 'report_status',
      render: (report_status) => (
          <Tag color={report_status ? 'geekblue' :'volcano' }>
            {`${report_status}`}
          </Tag>
      ), 
    },
    {
      title: 'Number of alerts',
      dataIndex: 'nb_alerts',
      key: 'nb_alerts',
    },
  ]


const Table = React.memo(({ list, loading }) => (
    <AntdTable
        columns={columns}
        dataSource={list}
        size='small'
        pagination={false}
        rowKey="index"
        loading={loading}
    />
));

export default Table;

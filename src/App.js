import React, { useState, useEffect, useCallback } from 'react';
import { database } from './firebaseConfig';
import Pagination from 'antd/lib/pagination';
import Layout from 'antd/lib/layout';
import Table from './Table';

import './index.css'
import 'antd/dist/antd.css';


const { Footer, Content } = Layout;

function App() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const LoadMore = useCallback((nextPage) => {
    setLoading(true)
    setPage(nextPage)
  }, [])
  
  //first page
  useEffect(() => {
    const dbRef = database.ref();

    dbRef
    .orderByKey()
    .limitToFirst(15)
    .once('value', 
      snapshot => {
        const newlist = [];
        snapshot.forEach(function(child) {
          newlist.push(child.val());
        });
        setList(newlist);
        setPage(1);
    });

    dbRef
    .limitToLast(1)
    .once('value', s => {
        const [ last ] = Object.values(s.val())
        setTotal(Number(last.index));
    });
    
  },[]);

  // next page
  useEffect(() => {
  const dbRef = database.ref();

  if(page) {
    const startAt = `${(page - 1) * 15}`;

    dbRef
    .orderByKey()
    .startAt(startAt)
    .limitToFirst(15)
    .once('value', 
      snapshot => {
        const newlist = [];
        snapshot.forEach(function(child) {
          newlist.push(child.val());
        });
        setList(newlist);
    })
    .then(() => setLoading(false));
  }

  },[page]);

  return (
      <Layout
        theme="dark"
      >
        <Content>
        <div style={{
          height: "calc(100vh - 72px)",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div>
            <Table list={list} loading={loading} />
          </div>
        </div>
        <Footer>
          <Pagination
              simple
              current={page}
              defaultPageSize={15}
              total={total}
              onChange={LoadMore}
              size='small'
            />
        </Footer>
        </Content>
      </Layout>
  );
}

export default App;

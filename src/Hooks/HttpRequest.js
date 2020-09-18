import React, { useState, useEffect } from 'react';
import axios from 'axios'; //node.js와 브라우저를 위한 http통신 라이브러리

export function useAxiosGet(url){
  const [request, setRequest] = useState({
    loading: false, //api가 로딩되는지 확인하기 false가 디폴트값
    data: null,
    error: false
  })

  useEffect(()=> {
    setRequest({
      loading: true,
      data:null,
      error: false
    })
    axios.get(url)
        .then(response => {
          setRequest({
            loading: false,
            data: response.data,
            error: false
          })
        })
          .catch(() => {
            setRequest({
              loading: false,
              data: null,
              error: true
          })
        })
  }, [url])


    return request
}



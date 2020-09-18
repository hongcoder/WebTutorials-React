import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Component/Loader'
import { useAxiosGet } from '../Hooks/HttpRequest';

function Product() {
  const { id } = useParams() // <Route>를 쓰지않는 컴포넌트는  match,location, history객체에 접근하려면
                            //withRouterHoC로 컴포넌트를 감싸야했는데 useParams hook은 바로 match.param같은 객체에 접근이 가능

  const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products/${id}` //유저가 제공한 api를 가져오기위해 axios.get(url)을 하기위함


  // axios.get(url)
  //   .then(response => {
  //     setProduct(response.data)
  //   }) 이렇게 하고 network탭을 보면 계속 url을 요청하기에 useEffect를 써야함

  let product = useAxiosGet(url)

  let content = null

  // useEffect(()=> {
  //   setProduct({
  //     lading: true,
  //     data: null,
  //     error: false
  //   })
  //     axios.get(url)
  //         .then(response => { //성공시
  //           setProduct({
  //             loading: false,
  //             data: response.data,
  //             error: false
  //           })
  //       })
  //       .catch(() => {
  //         setProduct({
  //           loading: false,
  //           data: null,
  //           error: true
  //         })
  //       })
  // }, [url]) //두 번째 인자가 변하면 첫 번째 함수가 실행됨 --to HttpRequest






 //useEffect 첫번째는 우리가 실행하고자 하는 코드, 두번째는 변화가 있을때마다 재실행이 요청될때 우리가 감시하려는 것

 if(product.error) {
  content = <p>
    There was an error, Please refresh or try again.
  </p>
  }


  if(product.loading) {
    content = <Loader></Loader>
  }



  if(product.data){
      content=
      <div>
        <h1 className="text-2xl font-bold mb-3"
        >{product.data.name}</h1>
        <div>
        <img
          src={product.data.images[0].imageUrl}
          alt={product.data.name}
        />
        </div>
        <div className="font-bold text-xl mb-3"
        >
          $ {product.data.price}
        </div>
        <div>
          {product.data.description}
        </div>
      </div>
  }
 return ( //기본으로 실행되고 위에 if문은 이게 안될 때
    <div>
      {content}
    </div>
  )
}

export default Product;
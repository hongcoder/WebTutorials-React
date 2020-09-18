import React from 'react'
import Loader from '../Component/Loader'
import ProductCard  from '../Component/ProductCard'
import { useAxiosGet } from '../Hooks/HttpRequest'

function Home() {
  //const { id } = useParams()  <Route>를 쓰지않는 컴포넌트는  match,location, history객체에 접근하려면
                            //withRouterHoC로 컴포넌트를 감싸야했는데 useParams hook은 바로 match.param같은 객체에 접근이 가능

  const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products?page=2&limit=10` //유저가 제공한 api를 가져오기위해 axios.get(url)을 하기위함


  let products = useAxiosGet(url)

  let content= null




  if(products.error) {
    content = <p>
      There was an error, Please refresh or try again.
    </p>
    }


    if(products.loading) {
      content = <Loader></Loader>
    }

    if(products.data){
      content=
      products.data.map((product) =>
      <div key={product.id}>
          <ProductCard
          product={product} />
      </div>)


  }
  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">
        Best Seller
        </h1>
    {content}
    </div>
  )
}

export default Home;
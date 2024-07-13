import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Card from '../components/Card'
// import Carousals from '../components/Carousals';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:9000/api/auth/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();
      // console.log(response[0],response[1])
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div> <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
 
 <div className="carousel-inner" id="carousel">
   <div className="carousel-caption" style={{zIndex:"10"}}>
   <div className="d-flex justify-content-center">
     <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
     {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
   </div>
   </div>
   <div className="carousel-item active">
     <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100 " styles={{ filter: "brightness(30%)" }}alt="..."/>
   </div>
   <div className="carousel-item">
     <img src="https://source.unsplash.com/random/900x700?pastry" className="d-block w-100"styles={{ filter: "brightness(30%)" }} alt="..."/>
   </div>
   <div className="carousel-item">
     <img src="https://source.unsplash.com/random/900x700?pizza" className="d-block w-100"styles={{ filter: "brightness(30%)" }} alt="..."/>
   </div>
 </div>
 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"styles={{ filter: "brightness(30%)" }} data-bs-slide="prev">
   <span className="carousel-control-prev-icon" aria-hidden="true"></span>
   <span className="visually-hidden">Previous</span>
 </button>
 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
   <span className="carousel-control-next-icon" aria-hidden="true"></span>
   <span className="visually-hidden">Next</span>
 </button></div></div>
      <div className='container'>
        {foodCat.length !== 0
          ? foodCat.map((data) => {
            return (
              <div className="row mb-3">
                {/* <div>{data.CategoryName}
                  </div> */}
              <div key={data.id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {foodItem.length !== 0
                  ? foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                    .map((filterItem) => (
                      <div key={filterItem._id} className="col-12 col-md-6 col-lg-3 ">
                        <Card foodItem={filterItem} options={filterItem.options[0]} 
                    
                        />

                      </div>
                    ))
                  : <div>No items</div>}
              </div>

            );
          })
          : ""
        }
        {/* <Card /> */}
      </div>
      <div><Footer /></div>
    </div>
  );
}
import React, { useContext, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShopContext } from "../context/shopContext";
function Nav() {
  const navigate=useNavigate();
  const [popup,setPopup]=useState("hidden");
  const {showSearch,user,setShowSearch,countCartItem,cartCount,setCartCount,cartItems}=useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const username=String(user).slice(0,2).toUpperCase()
  function handleSearchClick(){
    setShowSearch(true)
    navigate("/collection");
    
  }
  useEffect(()=>{
     countCartItem()
  },[cartItems])

  //handle popshow

  function handleclick(){
    if(popup==="hidden"){
      setPopup("block")
    }else{
      setPopup("hidden")
    }
  }


  //handling logout

  function handleLogout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
    window.location.reload();
  }
  return (
    <div className="flex justify-between p-1 sm:p-2 m-4  bg-white size-full">
      <Link to="/">
        <img className="h-8 w-[60px] sm:w-[128px]" src={assets.logo} alt="logo" />
      </Link>

      <div className="hidden  md:flex mx-16 nav-component font-serif">
        <div className="mx-3">
          <NavLink className=" font-medium" to="/">
            HOME
          </NavLink>
        </div>
        <div className="mx-3">
          <NavLink className=" font-medium" to="/about">
            ABOUT
          </NavLink>
        </div>
        <div className="mx-3">
          <NavLink className="font-medium" to="/collection">
            COLLECTION
          </NavLink>
        </div>
        <div className="mx-3">
          <NavLink className="font-medium" to="/connect">
            CONTACT
          </NavLink>
        </div>
      </div>
      <div className="logo flex justify-center items-center gap-4 md:gap-5 ">
        <img className="h-6" onClick={handleSearchClick} src={assets.search_icon} alt="Search bar" />
        <button onClick={()=>(navigate("/login"))} className={`text-center border ml-1 sm:ml-4 py-1 bg-pink-400 text-white rounded px-2 ${user==''?"block":"hidden"}`}>login</button>
        <div className="group relative ">
          <img onClick={handleclick} className={`h-6 ${user==''?"hidden":"block"} cursor-pointer`} src={assets.profile_icon} alt="Search bar" />
          <div className={`${popup} bg-slate-200 text-gray-500 py-3 px-6 rounded absolute top-8 right-1 `}>
            <p className="cursor-pointer text-pink-400 hover:text-black font-bold">User: {username}</p>
            <Link to='/login'>
            <p className="cursor-pointer hover:text-black font-bold">PROFILE</p>
            </Link>
            <Link to="/orders">
            <p className="cursor-pointer hover:text-black font-bold">ORDERS</p>
            </Link>
            <p onClick={handleLogout} className={`cursor-pointer hover:text-black font-bold ${user===''?"hidden":"block"}`}>LOGOUT</p>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img className="h-6" src={assets.cart_icon} alt="Search bar" />
          <p className="absolute top-[10px] left-2 border border-black rounded-full aspect-square bg-black text-white text-[10px] w-4 text-center font-bold">
            {cartCount}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          className="h-6 md:hidden "
          src={assets.menu_icon}
          alt="dropdown"
        />
      </div>
     


      {/* logic of drop down like if visible is true then if drop visible otherwise not */}
      <div
        className={`absolute  top-0 left-0 bottom-0 overflow-hidden  bg-white ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex items-center">
          <img
            onClick={() => setVisible(false)}
            className="rotate-180 m-5 h-6"
            src={assets.dropdown_icon}
            alt="back"
          />
          <p>Back</p>
        </div>
        <div className="flex flex-col">
          <NavLink
            onClick={() => setVisible(false)}
            className="p-2 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-2 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-2 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-2 border"
            to="/connect"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
    
  );
}

export default Nav;

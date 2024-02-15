import React from "react";
const Navbar = () => {
    return (
        <div className="bg-purple-800 flex justify-around text-white p-2">
            <div>
                <span className="text-2xl font-bold">iTasks</span>
            </div>
            <ul className="flex gap-10 hover:cursor-pointer ">
                <li className="hover:scale-125">Home</li>
                <li className="hover:scale-125">Your Tasks</li>
            </ul>
        </div>
        )
  
}
export default Navbar;

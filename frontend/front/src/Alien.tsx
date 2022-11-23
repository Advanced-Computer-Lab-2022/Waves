import React from "react"

interface props {
    adamsProp: string;
    children?: React.ReactNode;
    customChild?: React.ReactNode;
}
let a = 42104n;

const Alien: React.FC<props> = ({ adamsProp, customChild, children}) => {
    const isFirst = adamsProp.includes("1");
    console.log("From Alien Compoonent")
    return (
        <>
        <div style = {{color: "red"}}> From Alien Component {adamsProp} {isFirst && customChild} {true && "adam"}
            <div>

            </div>
        </div>
        {children}
        </>
    );
};

export default Alien
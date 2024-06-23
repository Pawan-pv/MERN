import { useEffect } from "react";

type ToastProps = {
    message: string;
    type : "SUCCESS"|"ERROR"
};

const Toast = ({message, type, onClose}: ToastProps) =>{
    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose()
        },5000);
        return () =>{
            clearTimeout(timer)
        }
    },[onClose] )
    const styles = type === "SUCCESS"
    ? "fixed top-4 z-50 rounded-md bg-green-600 text-white max-w-md"
    :"fixed top-4 z-50 rounded-md bg-green-600 text-white max-w-md"

    return (
        <div className="styles">
            <div className="flex justify-center iteam-center"> 
                span.text``
            </div>
        </div>
    )
}
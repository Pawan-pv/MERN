import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../config/hotel-option-config";

const TypeSection = () => {
    const { register, watch  } = useFormContext();
const typeWatch = watch("type")
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {
                    hotelTypes.map((type) => (
                        <label key={type} 
                        
                        className={
                          typeWatch === type 
                          ? "cursor-pointer bg-blue-700 text-sm text-center rounded-full py-2 px-4 font-semibold " 
                          : "cursor-pointer bg-whit-100  text-sm text-center rounded-full py-2 px-4 font-semibold  "
                        } >
                            <input
                                type="radio"
                                value={type}
                                {...register("type", { required: "This field is required" })}
                                className="hidden"
                            />
                            <span>{type}</span>
                        </label>
                    ))
                }
            </div>
        </div>
    );
}

export default TypeSection;

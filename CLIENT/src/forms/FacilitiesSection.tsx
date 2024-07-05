import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../config/hotel-option-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection =() =>{
    const { register ,
        formState: { errors }
    } = useFormContext<HotelFormData>()

    return(
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-4 py-2 gap-2">
                {
                    hotelFacilities.map((facility)=>(
                        <label className="cursor-pointer
                          text-sm text-center
                          rounded-full px-4 py-2 font-semibold">
                            <input 
                            type="checkbox" 
                            value={facility}
                            {...register("facilities", { 
                                validate: (facilities)=>{
                                 if (facilities && facilities.length >0) {
                                    return true
                                 }  else {
                                    return "At least one facility is required";
                                 }     
                            } } )}
                             >
                             
                            </input>
                            {facility}
                        </label>
                    ))

                }
            </div>
            {errors.facilities && <span 
            className="text-red-500 test-sm fond-bold"
            >{errors.facilities?.message}</span>}
        </div>
    )
}

export default FacilitiesSection
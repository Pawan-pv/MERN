import React from 'react'
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

function DetailsSection() {
    
    const { register,
            formState: { errors }
    } = useFormContext<HotelFormData>()
 
    return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold mb-3'>Add Hotel</h1>
        <label className="text-gray-700 text-sm font-bold">
                Name
                <input
                    type="text"
                    className="border rounded w-full py-1 font-normal"
                    {...register("name", { required: "This field is required" })}
                />
                {errors.name && <span>{errors.name.message}</span>}
            </label>
       <div className="flex gap-4">
       <label className="text-gray-700 text-sm font-bold">
                City
                <input
                    type="text"
                    className="border rounded w-full py-1 font-normal"
                    {...register("city", { required: "This field is required" })}
                />
                {errors.city && <span>{errors.city.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold">
               Country
                <input
                    type="text"
                    className="border rounded w-full py-1 font-normal"
                    {...register("country", { required: "This field is required" })}
                />
                {errors.country && <span>{errors.country.message}</span>}
            </label>
       </div>
       <div className="flex gap-4">
       <label className="text-gray-700 text-sm font-bold">
                Description
                <textarea
                    rows={10}
                    className="border rounded w-full py-1 font-normal"
                    {...register("discription", { required: "This field is required" })}
                />
                {errors.discription && <span>{errors.discription.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold">
               Price Per Night
                <input
                min={1}
                    type="number"
                    className="border rounded w-full py-1 font-normal"
                    {...register("pricePerNight", { required: "This field is required" })}
                />
                {errors.pricePerNight && <span>{errors.pricePerNight.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold">
               star rating
                <select {...register("starRating", {
                    required: "this filed is required"
                })}  className='border w-full rounded p-2 texr-gray-800 font-normal '>
                    <option value="" className='text-sm font-bold'>
                    select as Rating
                     </option>
                     {[1,2,3,4,5].map((num)=>(
                    <option value={num}> {num} </option>
                     ))}
                </select>
                {errors.starRating && <span>{errors.starRating.message}</span>}
            </label>
       </div>
    </div>
  )
}

export default DetailsSection
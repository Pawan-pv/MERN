
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
// import { HotelType } from "../../api-client";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    // bookings: BookingType[];
  };
type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
}

const ManageHotelForm = ({ onSave, isLoading , hotel}: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

     
    // Here's a brief overview of what the reset function does:
    
    // Resets Form Values: It resets the values of all form fields to their initial values. If initial values are not provided, it resets them to empty values.

   
    useEffect(()=>{
        reset(hotel)
    },[hotel, reset])

    const onDataSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();
        if(hotel){
            formData.append("hotelId", hotel._id)
        }
            
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        // Ensure facilities is an array before iterating
        if (Array.isArray(formDataJson.facilities)) {
            formDataJson.facilities.forEach((facility, index) => {
                formData.append(`facilities[${index}]`, facility);
            });
        } else {
            console.error('facilities is not an array');
        }

        // Ensure imageFiles is defined before iterating
        if (formDataJson.imageFiles) {
            Array.from(formDataJson.imageFiles).forEach((imageFile) => {
                formData.append(`imageFiles`, imageFile);
            });
        } else {
            console.error('imageFiles is not defined');
        }
        
        // console.log(formData)
        onSave(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onDataSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white hover:bg-blue-800 text-xl p-2 font-bold"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
}

export default ManageHotelForm;


































// import { FormProvider, useForm } from "react-hook-form";
// import DetailsSection from "./DetailsSection";
// import TypeSection from "./TypeSection";
// import FacilitiesSection from "./FacilitiesSection";
// import GuestsSection from "./GuestsSection";

// // export type HotelFormData = {
// //     name: string;
// //     city: string;
// //     country: string;
// //     description: string;
// //     type: string;
// //     pricePerNight: number;
// //     starRating: number;
// //     facilities: string[];
// //     adultCount: number;
// //     childCount: number;
// // }



// export type HotelFormData = {
//     name: string;
//     city: string;
//     country: string;
//     description: string;
//     type: string;
//     pricePerNight: number;
//     starRating: number;
//     facilities: string[];
//     imageFiles: FileList;
//     imageUrls: string[];
//     adultCount: number;
//     childCount: number;
//   };

// type Props = {
//     onSave: (hotelFormData: FormData) => void
//     isLoading: boolean
// }

// const ManageHotelForm = ({ onSave, isLoading }: Props) => {
//     const formMethods = useForm<HotelFormData>();
//     const { handleSubmit } = formMethods;

//     const onDataSubmit = handleSubmit((formDataJson: HotelFormData) => {
//         const formData = new FormData();
//         // formData.append("name", formDataJson.name);
//         // formData.append("city", formDataJson.city);
//         // formData.append("country", formDataJson.country);
//         // formData.append("description", formDataJson.description);
//         // formData.append("type", formDataJson.type);
//         // formData.append("pricePerNight", formDataJson.pricePerNight.toString());
//         // formData.append("starRating", formDataJson.starRating.toString());
//         // formData.append("adultCount", formDataJson.adultCount.toString());
//         // formData.append("childCount", formDataJson.childCount.toString());

//     formData.append("name", formDataJson.name);
//     formData.append("city", formDataJson.city);
//     formData.append("country", formDataJson.country);
//     formData.append("description", formDataJson.description);
//     formData.append("type", formDataJson.type);
//     formData.append("pricePerNight", formDataJson.pricePerNight.toString());
//     formData.append("starRating", formDataJson.starRating.toString());
//     formData.append("adultCount", formDataJson.adultCount.toString());
//     formData.append("childCount", formDataJson.childCount.toString());

//     formDataJson.facilities.forEach((facility, index) => {
//         formData.append(`facilities[${index}]`, facility);
//       });

//       Array.from(formDataJson.imageFiles).forEach((imageFile) => {
//         formData.append(`imageFiles`, imageFile);
//       });
  
        
//         // if (Array.isArray(formDataJson.facilities)) {
//         //     formDataJson.facilities.forEach((facility, index) => {
//         //         formData.append(`facilities[${index}]`, facility);
//         //     });
//         // } else {
//         //     console.error('facilities is not an array');
//         // }

//         onSave(formData);
//     });

//     return (
//         <FormProvider {...formMethods}>
//             <form className="flex flex-col gap-10" onSubmit={onDataSubmit}>
//                 <DetailsSection />
//                 <TypeSection />
//                 <FacilitiesSection />
//                 <GuestsSection />
//                 <span className="flex justify-end">
//                     <button
//                         type="submit"
//                         className="bg-blue-600 text-white hover:bg-blue-800 text-xl p-2 font-bold"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'Saving...' : 'Save'}
//                     </button>
//                 </span>
//             </form>
//         </FormProvider>
//     );
// }

// export default ManageHotelForm;

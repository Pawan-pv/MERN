import { useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/manageHotelform/ManageHotelForm";

const EditHotel = () => {
    const { hotelId } = useParams();
    const { showToast } = useAppContext();
     
    //destructure data to hotel;
    const { data: hotel } = useQuery(
      "fetchMyHotelById",
      () => apiClient.fetchMyHotelById(hotelId || ""),
      {
        enabled: !!hotelId,
      }
    );
    // console.log("hotel from EditHotel  which is fetchMyHotelById API")
    // console.log(hotel)
    
    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
      onSuccess: () => {
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Hotel", type: "ERROR" });
      },
    });

    const handleSave =(handleFormData: FormData)=>{
      mutate(handleFormData)
    }

    return (
      <ManageHotelForm isLoading={isLoading} onSave={handleSave} hotel={hotel}  />
    );
  };
  
  export default EditHotel;



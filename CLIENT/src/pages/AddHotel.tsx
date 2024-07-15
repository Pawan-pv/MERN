
import React from 'react';
// import ManageHotelForm from '../forms/manageHotel/ManageHotelForm';
import { useMutation } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from "../api-client";
import ManageHotelForm from '../forms/manageHotelform/ManageHotelForm';

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {

    onSuccess: () => {
      showToast({ message: "Hotel saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving hotel", type: "ERROR" });
    }
    
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  );
};

export default AddHotel;

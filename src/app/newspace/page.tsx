"use client";
import Image from "next/image";
import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import {imageDB} from "../../firebase/Config"
import { ref, uploadBytes } from "firebase/storage"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import qs from 'qs';
// import { stringify } from "querystring";
interface formData {
  spaceName: string;
  spaceLogo: string;
  headerTitle: string;
  customField: string;
  collectionType: string;
  imgUrl: string;
  questions: string[]; // Define questions as an array of strings
}
function Newspace() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState([{ id: 1 }]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputValues, setInputValues] = useState(Array(inputs.length).fill(""));
  // const [img, setImg] = useState('');
  
  const [formData, setFormData] = useState({
    spaceName: "",
    spaceLogo: "",
    headerTitle: "",
    customField: "",
    collectionType: "",
    imgUrl: "",
    questions: [] as string[],
  });
  const maxInputs = 4;
  const handleAddInput = () => {
    if (inputs.length < maxInputs) {
      setInputs([...inputs, { id: inputs.length + 1 }]);
    }
    
  };

  const handleRedirect = () => {
    router.push('/your-space-link'); 
  };




  const handleRemoveInput = (id: number) => {
    const newInputs = inputs.filter((input) => input.id !== id);
    setInputs(newInputs);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...inputValues];
    newValues[id - 1] = event.target.value; // Update the correct input value.
    console.log("New Values:", newValues); 
    setInputValues(newValues);
  
    // Update formData with the updated questions array
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: newValues, // Update the questions array with the new input values
    }));
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event?.target as HTMLInputElement)?.files?.[0];
    if (file) {
      
      console.log("Selected file:", file);
      const url = `files/${uuidv4()}`;
      console.log('Generated URL:', url);

      // Set the reference to Firebase Storage using the generated URL
      const imgRef = ref(imageDB, url);

      // Upload the image to Firebase Storage
      uploadBytes(imgRef, file)
        .then((snapshot) => {
          console.log('Image uploaded:', snapshot);
          
          // Update form data with the URL once upload is successful
          setFormData((prevFormData) => ({
            ...prevFormData,
            imgUrl: url,
          }));
        })
        .catch((error) => {
          console.error('Image upload failed:', error);
        });
      
    }
  else{
    console.log("No file selected please input any file");
  }}


  

const createNewSpace = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);
  setError("");

  // Include the inputValues array (representing the questions) in formData
  const updatedFormData = {
      ...formData,
     
  };

  try {
      const response = await axios.post("/api/newspace", updatedFormData, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      console.log(response.data);
      const { id } = response.data; 

      // passing the form data to local storage to use it in the next page (your-sapc-link)
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      // no need of this now 
      // const queryString = qs.stringify(updatedFormData);
      router.push(`/your-space-link/${id}`);

      

  } catch (error: any) {
      if (error.response) {
          setError(error.response.data.message || "An error occurred on the server.");
      } else if (error.request) {
          setError("No response received. Please check your network connection.");
      } else {
          setError("An unexpected error occurred: " + error.message);
      }
  } finally {
      setIsLoading(false);
  }
};



  return (
    <div className="h-screen bg-black flex p-8">
      <div className="w-1/3 h-1/2 mr-3 rounded-lg bg-zinc-900">
        <div>❤️</div>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <h1>
              {formData.headerTitle ? formData.headerTitle : "Header goes here"}
            </h1>
          </div>
          <div className="flex flex-col">
            <h3 className="text-center">
              {formData.customField
                ? formData.customField
                : "Custom message goes here"}
            </h3>
          </div>
          <h1>QUESTIONS</h1>
          <div>
            {inputs.map((input) => (
              <div key={input.id}>
                <h1>{inputValues[input.id - 1]}</h1>
              </div>
            ))}
          </div>
          <button className="btn btn-primary m-2 ">Record a video</button>
          <button className="btn btn-primary m-2">Send in Text</button>
        </div>
      </div>
 
      <div className="w-2/3  rounded-lg bg-zinc-900">
        <button></button>
        <button></button>
       
        <div className="flex  flex-col justify-center">
          <h1 className="font-extrabold text-2xl text-center  text-white">
            Create a new space
          </h1>
          <form action="" className="flex flex-col font-bold p-3  text-white" onSubmit={createNewSpace}>
            <label htmlFor="" className="m-1 text-xl  text-white">
              Space Name
            </label>
            <input
              type="text"
              className="w-4/5 h-10 m-1"
              name="spaceName"
              onChange={handleChange}
            />

           

            <div className="flex">
              <div className="border-solid border-2 w-6 h-6 rounded-full mr-2">
                
              </div>
              <input
                  type="file"
                  name="spaceLogo"
                  
                  onChange={handleFileChange}
                />
              {/* <div>
                <button className="text-xl ml-5" onClick={handleImageUpload}>Change</button>
              </div> */}
            </div>

            <label htmlFor="" className="text-xl m-1">
              Header title
            </label>
            <input
              type="text"
              name="headerTitle"
              className="w-4/5 h-10 m-1"
              onChange={handleChange}
            />

            <label htmlFor="" className="text-xl m-1">
              custom message
            </label>
            <input
              type="text"
              name="customField"
              className="w-4/5 h-10 m-1"
              onChange={handleChange}
            />



            <label htmlFor="" className="text-xl m-1">
              Questions
            </label>


            <div className="w-4/5 h-10 m-1">
              {inputs.map((input) => (
                <div key={input.id}>
                  <input
                    type="text"
                    value={inputValues[input.id - 1]}
                    onChange={(e) => handleInputChange(input.id, e)}
                  />


                  <button onClick={() => handleRemoveInput(input.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <div
                className="border-blue-500 rounded-full"
                onClick={handleAddInput}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>

            <label htmlFor="" className="text-xl m-1">
              collection type
            </label>
            <select  className="h-10 m-1 w-2/12"  name="collectionType"
  id="collectionType"
  
 >
              <option   className="text-xl m-1">
                text and video
              </option>
              <option   className="text-xl m-1">
                text only
              </option>
              <option   className="text-xl m-1">
                video only
              </option>
            </select>

            <div className="flex justify-center">
              <button className="btn btn-primary font-bold text-xl" type="submit" >
                Create a new space
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newspace;

/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import React, {useState} from 'react'
import {IAddProduct, AddProductInitValues as initialValues} from './SettingsModel'
import * as Yup from 'yup'
import {Formik, useFormik} from 'formik'
import { Features } from './components/Features'
import { SalesVariant } from './components/salesVariant'
 
import { SubFeature } from './components/subFeature'
import { useSelector, useDispatch } from "react-redux";
import { Store } from "../../../store/types";
import { TextField,Button } from '@mui/material'
   

 
 const AddProductSchema = Yup.object().shape({
  ProductName: Yup.string().required('Ürün adını girmeniz gereklidir.'),
  category: Yup.string().required('Kategoriyi girmeniz gereklidir.'),
  ModeID: Yup.string().required('Model kodunu girmeniz gerekir.'),
  Marka: Yup.string().required('Markayı girmeniz gerekir.'),
  color: Yup.string().required('Renk girmeniz gerekir.'),
  size: Yup.string().required('Beden bilgilerini girmeniz gerekir.'),
  explain: Yup.string(),
  image: Yup.string(),
  barcode: Yup.string(),
  price: Yup.string(),
  tlprice: Yup.string(),
  kdv: Yup.string(),
  stockCode: Yup.string(),
  process: Yup.string(),
    
  
  

})

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const CreateSingleProduct: FC  = ( ) => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
 
   const color = useSelector((state: Store) => state.color);
  const size = useSelector((state: Store) => state.size);

  const dispatch = useDispatch();

  const updateData = (fieldsToUpdate: Partial<IAddProduct>): void => {
    const updatedData = Object.assign(data, fieldsToUpdate)
    setData(updatedData)
  }

  const [loading, setLoading] = useState(false)
  const formik = useFormik<IAddProduct>({
    initialValues,
    validationSchema: AddProductSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        const updatedData = Object.assign(data, values)
        setData(updatedData)
        setLoading(false)
      }, 1000)
    },
  })
  const makeRequest = (formData:any) => {
    console.log("Form Submitted", formData);
  };

  const handleNextStep = (newData:any, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }

   };
   const steps = [
    <SalesVariant next={handleNextStep} data={data} />
 ];

 console.log("data", data);
   return (
     <>

        <div id='kt_account_profile_details' className='collapse show'>
      <form onSubmit={formik.handleSubmit} noValidate className='form'>
        {/* Ürün özellikleri */}
         <Features  />
        {/* Satış varyantı */}
        <SubFeature />

       
                     <div  >
     
      
    </div>
   
        {/* alt özellikleri */}
       
        {/* save */}
        <div className='card mb-5 mb-xl-10'>
          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' >
              {!loading && 'Kaydet'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Lütfen Bekleyiniz...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
       
    </div>
     </>
  )
}

export {CreateSingleProduct}
// {color.map((todo: { id: number; text: string }) => (
//   <div   key={todo.id}  >
//    <SalesVariant />
//   </div>
// ))}
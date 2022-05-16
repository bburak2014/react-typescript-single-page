import {FC} from 'react'
import React, {useState, useEffect} from 'react'
import {IAddProduct, AddProductInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {FieldConfig, useFormik,useField} from 'formik'
import {useSelector, useDispatch} from 'react-redux'
import {Store} from '../../../../store/types'



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
interface EventAttribute {
  attributeId: number
  attributeName: string
  categoryId: number
  categoryName: string
  id: number
}
interface EventAttributeDetails {
  attributeId: number
  attributeName: string
  id: number
  languageCode: string
  name: string
}
interface Props extends FieldConfig{
  label:string;
}
const SubFeature= () => {
   const dispatch = useDispatch()

  const [data, setData] = useState<IAddProduct>(initialValues)

  const [loading, setLoading] = useState(false)
  const [Attribute, setAttribute] = useState([])
  const [AttributeDetails, setAttributeDetails] = useState([])
  const [AttributeDetails1, setAttributeDetails1] = useState([])
  const [AttributeDetails2, setAttributeDetails2] = useState([])

  const category = useSelector((state: Store) => state.category)

  const token =
    'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYnVyYWtiaWxpY2lAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImRlbmVtbmUgZGVtbmVuZSIsIk1lcmNoYW50SWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJuYmYiOjE2NTE4MjEzMjQsImV4cCI6MTY1MTkwNzcyNCwiaXNzIjoibWVyaGFudHBhbmVsYXBpLm1vZGFsb2cuY29tIiwiYXVkIjoibWVyaGFudHBhbmVsYXBpLm1vZGFsb2cuY29tIn0.dXwoO7lULKeHyp5dn8z8hhQXdYdwOYGKIRKra2mm1zI'
  const UrlAttribute = `https://modalogmerchantapi.azurewebsites.net/categories/${category}/Attributes`

  const getAttributeApi = () =>
    fetch(UrlAttribute, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => response.json())
      .then((json) => setAttribute(json.data))

  const getAttributeDetailsApi = () =>
    fetch(`https://modalogmerchantapi.azurewebsites.net/attributes/1/Values?pageIndex=1`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => response.json())
      .then((json) => setAttributeDetails(json.data))
  const getAttributeDetailsApi1 = () =>
    fetch(`https://modalogmerchantapi.azurewebsites.net/attributes/2/Values?pageIndex=1`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => response.json())
      .then((json) => setAttributeDetails1(json.data))
  const getAttributeDetailsApi2 = () =>
    fetch(`https://modalogmerchantapi.azurewebsites.net/attributes/3/Values?pageIndex=1`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => response.json())
      .then((json) => setAttributeDetails2(json.data))
  useEffect(() => {
    getAttributeApi()
    getAttributeDetailsApi()
    getAttributeDetailsApi1()
    getAttributeDetailsApi2()
  }, [category])

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 '>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Ürün Özellikleri</h3>
        </div>
      </div>
      <div className='card-body border-top p-9'>
        {Attribute != null && (
          <div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Kumaş</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12  '>
                    <select
                      className='form-control form-control-lg form-control-solid form-select form-select-solid form-select-lg fw-bold'
                      placeholder=''
                    >
                      <option value='' disabled selected hidden>
                        Kumaş Seçiniz...
                      </option>
                      {AttributeDetails.map((to: EventAttributeDetails) => (
                        <option value={to.id}> {to.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Beden</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12  '>
                    <select
                      className='form-control form-control-lg form-control-solid form-select form-select-solid form-select-lg fw-bold'
                      placeholder=''
                    >
                      <option value='' disabled selected hidden>
                        Beden Seçiniz...
                      </option>
                      {AttributeDetails1.map((to: EventAttributeDetails) => (
                        <option value={to.id}> {to.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Renk</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12  '>
                    <select
                      className='form-control form-control-lg form-control-solid form-select form-select-solid form-select-lg fw-bold'
                      placeholder=''
                    >
                      <option value='' disabled selected hidden>
                        Renk Seçiniz...
                      </option>
                      {AttributeDetails2.map((to: EventAttributeDetails) => (
                        <option value={to.id}> {to.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export {SubFeature}

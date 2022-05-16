import {FC} from 'react'
import React, {useState, useEffect} from 'react'
import {IAddProduct, AddProductInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import ChipInput from 'material-ui-chip-input'
import {useSelector, useDispatch} from 'react-redux'
import {Store} from '../../../../store/types'
import {
  deleteTodo,
  setTodos,
  addTodo,
  setNewTodo,
  addColor,
  setcolor,
  getTodos,
  setCategory,
} from '../../../../store/actions'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import {styled} from '@mui/material/styles'

import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'

const ListItem = styled('li')(({theme}) => ({
  margin: theme.spacing(0.5),
}))

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

interface EventMeta {
  id: number
  languageCode: string
  name: string
  parentId: number
  subCategories: []
}
const Features: FC = () => {
  const [data, setData] = useState<IAddProduct>(initialValues)

  const [loading, setLoading] = useState(false)
  const size = useSelector((state: Store) => state.size)
  const color = useSelector((state: Store) => state.color)
  const todos = useSelector((state: Store) => state.todos)
 
  const [category, setcategory] = useState([])
  const [brand, setbrand] = useState([])

  const dispatch = useDispatch()
  const animatedComponents = makeAnimated()

  
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
 
  const handleChange = (e: any) => {
    console.log(e)
    dispatch(setcolor(e))

   }
  
  const token =
    'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYnVyYWtiaWxpY2lAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImRlbmVtbmUgZGVtbmVuZSIsIk1lcmNoYW50SWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJuYmYiOjE2NTE4MjEzMjQsImV4cCI6MTY1MTkwNzcyNCwiaXNzIjoibWVyaGFudHBhbmVsYXBpLm1vZGFsb2cuY29tIiwiYXVkIjoibWVyaGFudHBhbmVsYXBpLm1vZGFsb2cuY29tIn0.dXwoO7lULKeHyp5dn8z8hhQXdYdwOYGKIRKra2mm1zI'
  const UrlCategory = 'https://modalogmerchantapi.azurewebsites.net/categories'
  const UrlBrand = 'https://modalogmerchantapi.azurewebsites.net/brands?pageIndex=1'

  const getCategoryApi = () =>
    fetch(UrlCategory, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => response.json())
      .then((json) => setcategory(json.data))

  const getBrandApi = () =>
    fetch(UrlBrand, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => response.json())
      .then((json) => setbrand(json.data))
  useEffect(() => {
    getCategoryApi()
    getBrandApi()
  }, [])

  let CategoryOptions: {id: number; value: string; label: string}[] = []
  let BrandOptions: {id: number; value: string; label: string}[] = []

 
  const SortGetCategory = () => (
    category.map(
      (tod: EventMeta) => (
        CategoryOptions.push({id: tod.id, value: tod.name, label: tod.name}),
        tod.subCategories.length > 0 &&
          tod.subCategories.map((to: EventMeta) =>
            CategoryOptions.push({
              id: tod.id,
              value: tod.name + ' ' + to.name,
              label: tod.name + ' ' + to.name,
            })
          )
      )
    ),
    CategoryOptions.sort((a, b) => (a.label > b.label ? 1 : -1))
  )
  const SortGetBrand = () => (
    brand.map((tod: EventMeta) =>
      BrandOptions.push({id: tod.id, value: tod.name, label: tod.name})
    ),
    BrandOptions.sort((a, b) => (a.label > b.label ? 1 : -1))
  )
  const reduxId = (e:any) => (
      dispatch(setCategory(e.id))

  )
 
  SortGetCategory()
  SortGetBrand()
  const CategoriesComponent = () => <Select options={CategoryOptions} onChange={reduxId} placeholder={"Kategori Seçiniz"} />
  const BrandsComponent = () => <Select options={BrandOptions} placeholder={"Marka Seçiniz"}  />
  // const AnimatedMulti = () => <Select  components={animatedComponents} isMulti options={SizeOption} onChange={handleKeyPressColozr} />
  

  const handleKeyPressColozr = (e: any) => {
    dispatch(setNewTodo(e.target.value))
    dispatch(addTodo())
   }
 
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0  '>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Ürün Bilgileri</h3>
        </div>
      </div>
      <div className='card-body border-top p-9'>
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Ürün Adı</label>

          <div className='col-lg-8'>
            <div className='row'>
              <div className='col-lg-12 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                  placeholder='Ürün Adı'
                  {...formik.getFieldProps('ProductName')}
                />
                {formik.touched.ProductName && formik.errors.ProductName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.ProductName}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>
            <span className='required'>Kategori</span>
          </label>

          <div className='col-lg-8  '>
            <CategoriesComponent />
          </div>
        </div>
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Model Kodu</label>

          <div className='col-lg-8 fv-row'>
            <input
              type='text'
              className='form-control form-control-lg form-control-solid'
              placeholder='Model Kodu'
              {...formik.getFieldProps('ModeID')}
            />
            {formik.touched.ModeID && formik.errors.ModeID && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.ModeID}</div>
              </div>
            )}
          </div>
        </div>

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>
            <span className='required'>Marka</span>
          </label>

          <div className='col-lg-8 '>
            <BrandsComponent />
          </div>
        </div>

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>
            <span className='required'>Renk</span>
          </label>

          <div className='col-lg-8 fv-row'>
            <ChipInput
              className='form-control form-control-lg form-control-solid'
              defaultValue={[]}
              onChange={handleChange}
            />

            {formik.touched.color && formik.errors.color && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.color}</div>
              </div>
            )}
          </div>
        </div>

        

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>
            <span className='required'>Beden</span>
          </label>

          <div className='col-lg-2 fv-row'>
            {/* <input className=' form-control form-control-lg form-control-solid'             
   onChange={(evt:any) => dispatch(setNewTodo(evt.target.value))}
    type="text" /> */}

            <select
              className='form-select form-select-solid form-select-lg fw-bold'
              onChange={handleKeyPressColozr}
              placeholder='dd'
            >
              <option value='' disabled selected hidden>
                Beden Seçiniz...
              </option>

              <option value='XL'>XL</option>
              <option value='LG'>LG</option>
              <option value='MD'>MD</option>
              <option value='SM'>SM</option>
              <option value='SM'>XS</option>
            </select>

            {formik.touched.color && formik.errors.color && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.color}</div>
              </div>
            )}
          </div>
          <div className='col-lg-6 fv-row'>
            <button
              style={{display: 'none'}}
              onClick={() => {
                dispatch(addTodo())
              }}
            >
              todo
            </button>

            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component='ul'
              className='form-control form-control-lg form-control-solid'
            >
              {todos.map((data) => {
                let icon

                return (
                  <ListItem key={data.id}>
                    <Chip
                      icon={icon}
                      label={data.text}
                      onDelete={() => dispatch(deleteTodo(data.id))}
                    />
                  </ListItem>
                )
              })}
            </Paper>
          </div>
        </div>
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>
            <span className='required'>Açıklamalar</span>
          </label>

          <div className='col-lg-8 fv-row'>
            <textarea
              rows={5}
              className='form-control form-control-lg form-control-solid'
              placeholder='Açıklamalar'
              {...formik.getFieldProps('explain')}
            ></textarea>
            {formik.touched.explain && formik.errors.explain && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block '>{formik.errors.explain}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export {Features}

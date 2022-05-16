import {FC} from 'react'
import React, {useState} from 'react'
import {IAddProduct, AddProductInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useSelector, useDispatch} from 'react-redux'
import {Store} from '../../../../store/types'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'

import {deleteTodo,setcolor, setsize} from '../../../../store/actions'

const SalesVariantSchema = Yup.object().shape({
 
  barcode: Yup.string(),
  price: Yup.string(),
  tlprice: Yup.string(),
  kdv: Yup.string(),
  stockCode: Yup.string(),
  process: Yup.string(),
  stock: Yup.string(),
})

const SalesVariant = (props:any) => {
  const color = useSelector((state: Store) => state.color)
  const size = useSelector((state: Store) => state.size)
  const todos = useSelector((state: Store) => state.todos);

  const dispatch = useDispatch();

  const [data, setData] = useState<IAddProduct>(initialValues)

  const [loading, setLoading] = useState(false)

  const formik = useFormik<IAddProduct>({
    initialValues,
    validationSchema: SalesVariantSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        const updatedData = Object.assign(data, values)
        setData(updatedData)
        setLoading(false)
      }, 1000)
    },
  })
  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header border-1 '>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Satış ve Varyant Bilgileri</h3>
          </div>
        </div>

        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <div className='col-lg-12'>
              <div className='row'>
                <div>
  {/* <table className='table form-control   table-rounded table-size'>
                  <tr>
                    <td className='frmth' scope='col-lg-1'>
                      {' '}
                      <input type='checkbox' name='Checkboxes15_1' />
                    </td>

                    <td className='frmth' scope='col-lg-1'>
                      GÖRSEL
                    </td>
                    <td className='frmth' scope='col-lg-1'>
                      RENK
                    </td>

                    <td className='frmth' scope='col-lg-1'>
                      BEDEN
                    </td>
                    <td className='frmth' scope='col-lg-1'>
                      BARKOD{' '}
                    </td>
                    <th className='frmth' scope='col-lg-1'>
                      FİYAT
                    </th>
                    <td className='frmth' scope='col-lg-2'>
                      TOMMY LIFE SATIŞ FİYATI
                    </td>
                    <td className='frmth' scope='col-lg-1'>
                      STOK
                    </td>
                    <td className='frmth' scope='col-lg-1'>
                      KDV
                    </td>
                    <td className='frmth' scope='col-lg-1'>
                      STOK KODU{' '}
                    </td>
                    <td className='frmth' scope='col-lg-1'>
                      İŞLEM
                    </td>
                  </tr>
                  <tbody>
                    {color.map((todo: {id: number; text: string}) => (
                      <tr key={todo.id}>
                        {' '}
                        <td className='col-lg-1 pCell'>
                          {' '}
                          <input
                            type='checkbox'
                            name='Checkboxes15_1'
                            style={{cursor: 'pointer'}}
                          />
                        </td>
                        <td className='col-lg-1 pCell'>
                          {' '}
                          <label
                            className='btn btn-xs  btn-circle   btn-icon    '
                            data-action='change'
                            data-theme='dark'
                            data-original-title='Change avatar'
                          >
                            <div className='tooltipp'>
                              {' '}
                              <i className='fas fa-image iconFie '></i>
                              <span className='tooltipptext'>Görsel Ekleyiniz</span>
                            </div>
                            <input
                              className='fileUpload'
                              type='file'
                              name='profile_avatar'
                              accept='.png, .jpg, .jpeg'
                            />
                          </label>
                        </td>
                        <td className='col-lg-1 pCell ' {...formik.getFieldProps('color')}>
                          {' '}
                          RENK
                        </td>
                        <td className='col-lg-9 '>
                          <tr>
                            <td className='col-lg-1 form-control   form-control-solid  frmcntrl'>
                              {' '}
                              BEDEN
                            </td>
                            <td className='col-lg-1'>
                              {' '}
                              <input
                                type='text'
                                className='form-control   form-control-solid  frmcntrl'
                                placeholder=''
                                {...formik.getFieldProps('barcode')}
                              />
                              {formik.touched.barcode && formik.errors.barcode && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>{formik.errors.barcode}</div>
                                </div>
                              )}
                            </td>
                            <td className='col-lg-1'>
                              <input
                                type='text'
                                className='form-control   form-control-solid  frmcntrl'
                                placeholder=''
                                {...formik.getFieldProps('price')}
                              />
                              {formik.touched.price && formik.errors.price && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>{formik.errors.price}</div>
                                </div>
                              )}
                            </td>
                            <td className='col-lg-2'>
                              <input
                                type='text'
                                className='form-control   form-control-solid  frmcntrl'
                                placeholder=''
                                {...formik.getFieldProps('tlprice')}
                              />
                              {formik.touched.tlprice && formik.errors.tlprice && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>{formik.errors.tlprice}</div>
                                </div>
                              )}
                            </td>

                            <td className='col-lg-1'>
                              <input
                                type='text'
                                className='form-control   form-control-solid  frmcntrl'
                                placeholder=''
                                {...formik.getFieldProps('stock')}
                              />
                              {formik.touched.stock && formik.errors.stock && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>{formik.errors.stock}</div>
                                </div>
                              )}
                            </td>
                            <td className='col-lg-1'>
                              <select
                                className='form-select form-select-solid form-select-lg fw-bold selectpicker frmcntrl'
                                data-live-search='true'
                                {...formik.getFieldProps('kdv')}
                              >
                                <option value=''>KDV </option>
                                <option value='AF'>% 18</option>
                                <option value='AX'>% 8</option>
                                <option value='AK'>% 2</option>
                                <option value='AL'>% 1</option>
                              </select>
                            </td>
                            <td className='col-lg-1'>
                              <input
                                type='text'
                                className='form-control   form-control-solid  frmcntrl'
                                placeholder=''
                                {...formik.getFieldProps('stockCode')}
                              />
                              {formik.touched.stockCode && formik.errors.stockCode && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>{formik.errors.stockCode}</div>
                                </div>
                              )}
                            </td>
                            <td className='col-lg-1'>
                              <input
                                type='text'
                                className='form-control   form-control-solid  frmcntrl'
                                placeholder=''
                                {...formik.getFieldProps('process')}
                              />
                              {formik.touched.process && formik.errors.process && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>{formik.errors.process}</div>
                                </div>
                              )}
                            </td>
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}

                </div>
              
                {todos.length > 0 ? (
                  <div className='col-lg-12 fv-row'>
                    <table className='tableSelfStyle '>
                      <tr className='tableSelfStyleElement'>
                        <td className='tableSelfStyleTd shdw'>
                          {' '}
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='Checkboxes15_1'
                          />
                        </td>

                        <td className='tableSelfStyleTd shdw'>GÖRSEL</td>
                        <td className='tableSelfStyleTd shdw'>RENK</td>

                        <td className='tableSelfStyleTd shdw'>BEDEN</td>
                        <td className='tableSelfStyleTd shdw'>BARKOD </td>
                        <td className='tableSelfStyleTd shdw'>FİYAT</td>
                        <td className='tableSelfStyleTd shdw'>MODALOG SATIŞ FİYATI</td>
                        <td className='tableSelfStyleTd shdw'> STOK</td>
                        <td className='tableSelfStyleTd shdw'>KDV</td>
                        <td className='tableSelfStyleTd shdw'>STOK KODU </td>
                        <td className='tableSelfStyleTd shdw'>İŞLEM</td>
                      </tr>
                      <tbody>
                      {color.map((to: {id: number; text: string}) => (
                        <tr className='shdw2' key={to.id}>
                          <td className='tableSelfStyleTd'>
                            {' '}
                            <input
                              className='form-check-input'
                              type='checkbox'
                              name='Checkboxes15_1'
                            />
                          </td>
                           <td className='tableSelfStyleTd'>
                            <label
                              className='btn btn-xs  btn-circle   btn-icon    '
                              data-action='change'
                              data-theme='dark'
                              data-original-title='Change avatar'
                            >
                              <div className='tooltipp'>
                                {' '}
                                <i className='fas fa-image iconFie '></i>
                                <span className='tooltipptext'>Görsel Ekleyiniz</span>
                              </div>
                              <input
                                className='fileUpload'
                                type='file'
                                name='profile_avatar'
                                accept='.png, .jpg, .jpeg'
                              />
                            </label>
                          </td>
                          <td className='tableSelfStyleTd'>{to}</td>
                          <td className='tableSelfStyleTd  '>
                            <table style={{width: '100%'}}>
                              {todos.map((tod: {id: number; text: string}) => (
                                <tr key={tod.id}>
                                  
                                    <div className='  frmTd '>{tod.text}</div>
                                  
                                  

                                  
                                </tr>
                              ))}
                            </table>
                          </td>
                          <td className='tableSelfStyleTd  '>
                            <table style={{width: '100%'}}>
                              {todos.map((tod: {id: number; text: string}) => (
                                <tr key={tod.id}>
                                  
                                  <input type="text" className='  frmTd ' />
                                  
                                  

                                  
                                </tr>
                              ))}
                            </table>
                          </td>
                          <td className='tableSelfStyleTd  '>
                            <table style={{width: '100%'}}>
                              {todos.map((tod: {id: number; text: string}) => (
                                <tr key={tod.id}>
                                  
                                  <input type="text" className='  frmTd ' />
                                  
                                  

                                  
                                </tr>
                              ))}
                            </table>
                          </td>                       
                          <td className='tableSelfStyleTd  '>
                            <table style={{width: '100%'}}>
                              {todos.map((tod: {id: number; text: string}) => (
                                <tr key={tod.id}>
                                  
                                  <input type="text" className='  frmTd ' />
                                  
                                  

                                  
                                </tr>
                              ))}
                            </table>
                          </td>                       
                          <td className='tableSelfStyleTd  '>
                            <table style={{width: '100%'}}>
                              {todos.map((tod: {id: number; text: string}) => (
                                <tr key={tod.id}>
                                  
                                  <input type="text" className='  frmTd ' />
                                  
                                  

                                  
                                </tr>
                              ))}
                            </table>
                          </td>                     
                          <td className='tableSelfStyleTd  '>
                            <table style={{width: '100%'}}>
                              {todos.map((tod: {id: number; text: string}) => (
                                <tr key={tod.id}>
                                  
                                  <input type="text" className='  frmTd ' />
                                  
                                  

                                  
                                </tr>
                              ))}
                            </table>
                          </td>
                          <td className='tableSelfStyleTd  '>
                            <table style={{width: '100%'}}>
                              {todos.map((tod: {id: number; text: string}) => (
                                <tr key={tod.id}>
                                  
                                  <input type="text" className='  frmTd ' />
                                  
                                  

                                  
                                </tr>
                              ))}
                            </table>
                          </td>
                          
                          <td className='tableSelfStyleTd  '>
                            <table style={{width: '100%'}}>
                              {todos.map((tod: {id: number; text: string}) => (
                                <tr key={tod.id}>
                                  
                                  <button
                                      onClick={() => dispatch(deleteTodo(tod.id))}
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 btnDelete'
                                    >            <KTSVG path='/media/icons/duotune/general/gen027.svg' />
                                    </button>
                                  
                                  

                                  
                                </tr>
                              ))}
                            </table>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                    {formik.touched.ProductName && formik.errors.ProductName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.ProductName}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
       
      </div>
      
    </>
  )
}
export {SalesVariant}

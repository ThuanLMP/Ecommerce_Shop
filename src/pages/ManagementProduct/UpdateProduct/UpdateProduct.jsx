
import AdminLayout from '../../../layouts/AdminLayout'
import styles from './UpdateProduct.module.scss'
import { Autocomplete, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Navigate from '../components/Navigate'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useEffect, useState } from 'react'
import productsApi from '../../../api/productsApi'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { addProductSchema } from '../../../utils/validate'
import { LoadingButton } from '@mui/lab'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const listNav = ['Dashboard', 'Product', 'Update Product']
const listOptionRate = ['1', '2', '3', '4', '5']

export default function UpdateProduct() {
    const product = useSelector(state => state.management.product)
    const [image, setImage] = useState(product.images[0])
    const [allCategoris, setAllCategories] = useState([])
    const [rating, setRating] = useState('5')
    const [categoris, setCategories] = useState([product.category])
    const [loading, setLoading] = useState(false)

    const updateProduct = async (dataProduct) => {
        setLoading(true)
        try {
            const res = await productsApi.updateProduct(dataProduct, product.id)
            if(res.status===200) {
                toast.success('Update product success')
            }
        } catch (error) {
            toast.error('Update product fail')
            console.log(error)
        }
        setLoading(false)
    }
    const updateImg = async () => {
        try {
            const res = await productsApi.updateImg(image.url, image.id)
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            name: product.name,
            description: product.description,
            price: product.price,
            brand: product.brand,
            stockQuantity: product.countInStock
        },
        onSubmit: (values, { resetForm }) => {
            const dataProduct = {
                name: values.name,
                brand: values.brand,
                category: categoris[0] ?? allCategoris[0],
                description: values.description,
                price: values.price,
                rating: rating,
                countInStock: values.stockQuantity,
            }
            updateProduct(dataProduct)
            updateImg()
        },
        validationSchema: addProductSchema
    })

    const handleUploadFile = async (e) => {
        let formData = new FormData()
        formData.append('image', e.target.files[0], e.target.files[0].name)
        try {
            const res = await productsApi.uploadImg(formData)
            if (res.status === 200) {
                setImage({ ...image, url: res.data.data.imageURL })
            }
        } catch (error) {
            console.log(error)
        }

    }



    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await productsApi.getAllCategories()
                setCategories(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories()
    }, [])


    return (
        <AdminLayout>
            <Navigate listNav={listNav} />
            <Box component='form' onSubmit={formik.handleSubmit} sx={{
                position: 'relative'
            }}>
                <h2 style={{ marginLeft: '30px', marginTop: '30px' }}>Create Product</h2>
                <LoadingButton
                    type='submit'
                    loading={loading}
                    sx={{
                        backgroundColor: '#FFD333',
                        color: 'black',
                        textTransform: 'none',
                        fontSize: '20px',
                        fontWeight: '600',
                        width: '150px',
                        height: '40px',
                        position: 'absolute',
                        right: '75px',
                        top: '-6px'
                    }}

                >Save</LoadingButton>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Box sx={{
                        height: '760px',
                        minWidth: '55%',
                        backgroundColor: 'white',
                        marginLeft: '33px',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        borderRadius: '3px'
                    }}>
                        <Typography sx={{
                            fontSize: '22px',
                            fontWeight: '700',
                            marginLeft: '26px'
                        }}>Basic Information</Typography>
                        <Divider
                            sx={{
                                borderRightWidth: 2,
                                backgroundColor: '#737070',
                                marginBottom: '19px',
                            }}
                        />
                        <Box component='div' sx={{
                            marginLeft: '5%',
                            fontWeight: 'bolder',
                            color: 'black'
                        }}>
                            <Typography sx={{
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>Name</Typography>
                            <TextField sx={{
                                width: '90%',
                            }}
                                name='name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}

                            />
                            <Typography
                                sx={{
                                    color: 'red'
                                }}
                            >
                                {
                                    formik.errors.name && formik.touched.name && formik.errors.name
                                }
                            </Typography>

                            <Typography sx={{
                                fontSize: '18px',
                                fontWeight: '700',
                                marginTop: '25px'
                            }}>Description</Typography>
                            <TextField
                                name='description'
                                multiline
                                rows={3}
                                size="small"
                                sx={{
                                    width: '90%'
                                }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}

                            />
                            <Typography
                                sx={{
                                    color: 'red'
                                }}
                            >
                                {
                                    formik.errors.description && formik.touched.description && formik.errors.description
                                }
                            </Typography>

                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box sx={{
                                    width: '50%'
                                }}>
                                    <Typography sx={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        marginTop: '25px'
                                    }}>Price</Typography>
                                    <TextField sx={{
                                        width: '80%',
                                    }}
                                        name='price'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.price}

                                    />
                                    <Typography
                                        sx={{
                                            color: 'red'
                                        }}
                                    >
                                        {
                                            formik.errors.price && formik.touched.price && formik.errors.price
                                        }
                                    </Typography>

                                </Box>

                                <Box sx={{
                                    marginLeft: '41px',
                                    width: '50%'
                                }}>
                                    <Typography sx={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        marginTop: '25px'
                                    }}>Discount Percent</Typography>
                                    <TextField sx={{
                                        width: '80%',
                                    }} />
                                </Box>
                            </Box>

                            <Typography sx={{
                                fontSize: '18px',
                                fontWeight: '700',
                                marginTop: '25px'
                            }}
                            >
                                Brand
                            </Typography>
                            <TextField sx={{
                                width: '90%',
                            }}
                                name='brand'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.brand}
                            />
                            <Typography
                                sx={{
                                    color: 'red'
                                }}
                            >
                                {
                                    formik.errors.brand && formik.touched.brand && formik.errors.brand
                                }
                            </Typography>

                            <Typography sx={{
                                fontSize: '18px',
                                fontWeight: '700',
                                marginTop: '25px'
                            }}
                            >
                                Stock quantity
                            </Typography>
                            <TextField sx={{
                                width: '90%',
                            }}
                                name='stockQuantity'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stockQuantity}

                            />
                            <Typography
                                sx={{
                                    color: 'red'
                                }}
                            >
                                {
                                    formik.errors.stockQuantity && formik.touched.stockQuantity && formik.errors.stockQuantity
                                }
                            </Typography>

                        </Box>

                    </Box>

                    <Box sx={{
                        width: '35%',
                    }}>
                        <Box
                            sx={{
                                height: '260px',
                                width: '100%',
                                backgroundColor: 'white',
                                marginLeft: '35px',
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                borderRadius: '3px'
                            }}
                        >
                            <Typography sx={{
                                fontSize: '22px',
                                fontWeight: '700',
                                marginLeft: '26px'
                            }}>Images</Typography>
                            <Divider
                                sx={{
                                    borderRightWidth: 2,
                                    backgroundColor: '#737070',
                                }}

                            />
                            <Box>
                                {
                                    image === undefined ?
                                        <DriveFolderUploadIcon sx={{
                                            fontSize: 100,
                                            marginLeft: '40%',
                                            marginTop: '20px'
                                        }} /> :
                                        <Box sx={{
                                            marginLeft: '35%',
                                            marginTop: '20px'
                                        }}>
                                            <img style={{ height: '100px', width: '100px' }} src={image.url} />
                                        </Box>

                                }


                                <Button
                                    sx={{
                                        marginLeft: '23%',
                                        marginTop: '10px'
                                    }}
                                    containerElement='label'
                                    label='My Label'>
                                    <input type="file" onChange={handleUploadFile} />
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                height: '190px',
                                width: '100%',
                                backgroundColor: 'white',
                                marginLeft: '35px',
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                borderRadius: '3px',
                                marginTop: '34px'
                            }}
                        >
                            <Typography sx={{
                                fontSize: '22px',
                                fontWeight: '700',
                                marginLeft: '26px'
                            }}>Categories</Typography>
                            <Divider
                                sx={{
                                    borderRightWidth: 2,
                                    backgroundColor: '#737070',

                                }}
                            />
                            <Box sx={{
                                marginTop: '10px',
                                marginLeft: '5%',
                                width: '90%',
                                height: '80px'
                            }}>
                                <Stack spacing={3} sx={{ width: '90%', marginLeft: '5%', marginTop: '7px' }}>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={allCategoris}
                                        defaultValue={categoris}
                                        onChange={(e, value) => setCategories(value)}
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                            />
                                        )}
                                    />
                                </Stack>

                            </Box>
                        </Box>
                        <Box
                            sx={{
                                height: '240px',
                                width: '100%',
                                backgroundColor: 'white',
                                marginLeft: '35px',
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                borderRadius: '3px',
                                marginTop: '35px'
                            }}
                        >
                            <Typography sx={{
                                fontSize: '22px',
                                fontWeight: '700',
                                marginLeft: '26px'
                            }}>Rating</Typography>
                            <Divider
                                sx={{
                                    borderRightWidth: 2,
                                    backgroundColor: '#737070',

                                }}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={listOptionRate}
                                defaultValue={rating}
                                onChange={(e, value) => setRating(value)}
                                sx={{ width: '90%', marginLeft: '5%', marginTop: '21px' }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </Box>
                </Box>

            </Box >

        </AdminLayout >
    )
}
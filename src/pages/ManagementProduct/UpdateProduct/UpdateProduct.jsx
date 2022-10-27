
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

const listNav = ['Dashboard', 'Product', 'Update Product']
const listOptionRate = ['1', '2', '3', '4', '5']

export default function UpdateProduct() {
    const [image, setImage] = useState()
    const [categoris, setCategories] = useState([])
    const [product, setProduct] = useState()
    const { id } = useParams()




    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            brand: '',
            stockQuantity: 0,
            imfg: '',
            categoris: '',
            rating: ''
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const handleUploadFile = async (e) => {
        let formData = new FormData()
        formData.append('image', e.target.files[0], e.target.files[0].name)
        try {
            const res = await productsApi.uploadImg(formData)
            setImage(res.data.data.imageURL)

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await productsApi.getProductById(id)
                setProduct(res.data.data.product)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [id])
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
            {product === undefined ? <></> :
                <Box component='div' sx={{
                    position: 'relative'
                }}>
                    <h2 style={{ marginLeft: '30px', marginTop: '30px' }}>Update Product #{product.id}</h2>
                    <Typography sx={{
                        fontWeight: '500',
                        fontSize: '16px',
                        color: '#929395',
                        marginLeft: '30px',
                        marginTop: '-20px',
                        marginBottom: '10px'
                    }}>Product ID: {product.id}</Typography>
                    <form>


                        <Button
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

                        >Save</Button>
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
                                    <TextField
                                        sx={{
                                            width: '90%',
                                        }}
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />

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
                                        value={product.description}
                                    />
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
                                                value={product.price}
                                            />
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
                                            }}
                                                value={'50%'}
                                            />
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
                                        value={product.brand}
                                    />

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
                                    }} />
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
                                                    <img style={{ height: '100px', width: '100px' }} src={image} />
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
                                                options={categoris}
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
                                        defaultValue={'5'}
                                        sx={{ width: '90%', marginLeft: '5%', marginTop: '21px' }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </form>
                </Box>
            }

        </AdminLayout>
    )
}
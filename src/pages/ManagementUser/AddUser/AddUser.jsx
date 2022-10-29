import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import Navigate from "../../ManagementProduct/components/Navigate";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import productsApi from "../../../api/productsApi";
import { inputUser } from "../../../utils/validate";
import userApi from "../../../api/userApi";
import { toast } from "react-toastify";

const listNav = ['Dashboard', 'User', 'Create User']
export default function AddUser() {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState()
    const [role, setRole] = useState('user')

    const createUser = async (dataUser, resetForm) => {
        setLoading(true)
        try {
            const res = await userApi.createUser(dataUser)
            if (res.status === 200) {
                toast.success('Add user success')
                resetForm()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        setLoading(false)
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            contact: ''
        },
        onSubmit: (values, { resetForm }) => {
            const dataUser = {
                username: values.name,
                email: values.email,
                password: values.password,
                role: role,
                avatar: image,
                contact: values.contact
            }
            createUser(dataUser, resetForm)

        },
        validationSchema: inputUser
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

    return (
        <AdminLayout>

            <Navigate listNav={listNav} />
            <Box component='form' onSubmit={formik.handleSubmit} sx={{
                position: 'relative'
            }}>
                <h2 style={{ marginLeft: '30px', marginTop: '30px' }}>Create User</h2>
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

                >Add user</LoadingButton>

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
                        }}>User Information</Typography>
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
                                fontWeight: '700',
                                marginTop: '30px',
                                marginBottom: '10px'
                            }}>Name</Typography>
                            <TextField size="small" sx={{
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
                                marginTop: '30px',
                                marginBottom: '10px'
                            }}>Email</Typography>
                            <TextField
                                name='email'
                                size="small"
                                sx={{
                                    width: '90%'
                                }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}

                            />
                            <Typography
                                sx={{
                                    color: 'red'
                                }}
                            >
                                {
                                    formik.errors.email && formik.touched.email && formik.errors.email
                                }
                            </Typography>

                            <Typography sx={{
                                fontSize: '18px',
                                fontWeight: '700',
                                marginTop: '30px',
                                marginBottom: '10px'
                            }}>Password</Typography>
                            <TextField
                                name='password'
                                size="small"
                                sx={{
                                    width: '90%'
                                }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                type='password'
                            />
                            <Typography
                                sx={{
                                    color: 'red'
                                }}
                            >
                                {
                                    formik.errors.password && formik.touched.password && formik.errors.password
                                }
                            </Typography>

                            <Typography sx={{
                                fontSize: '18px',
                                fontWeight: '700',
                                marginTop: '30px',
                                marginBottom: '10px'
                            }}>Retype password</Typography>
                            <TextField
                                name='rePassword'
                                size="small"
                                sx={{
                                    width: '90%'
                                }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rePassword}
                                type='password'
                            />
                            <Typography
                                sx={{
                                    color: 'red'
                                }}
                            >
                                {
                                    formik.errors.rePassword && formik.touched.rePassword && formik.errors.rePassword
                                }
                            </Typography>

                            <Typography sx={{
                                fontSize: '18px',
                                fontWeight: '700',
                                marginTop: '30px',
                                marginBottom: '10px'
                            }}>Role</Typography>


                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={['admin', 'user']}
                                defaultValue={role}
                                onChange={(e, value) => setRole(value)}
                                sx={{ width: '90%', marginLeft: '0%', marginTop: '21px' }}
                                renderInput={(params) => <TextField {...params} size='small' />}
                            />
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
                                height: '450px',
                                width: '100%',
                                backgroundColor: 'white',
                                marginLeft: '35px',
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                borderRadius: '3px',
                                marginTop: '50px'
                            }}
                        >
                            <Typography sx={{
                                fontSize: '22px',
                                fontWeight: '700',
                                marginLeft: '26px'
                            }}>Another info</Typography>
                            <Divider
                                sx={{
                                    borderRightWidth: 2,
                                    backgroundColor: '#737070',
                                }}

                            />
                            <Box sx={{
                                marginLeft: '30px'
                            }}>
                                <Typography sx={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    marginTop: '30px',
                                    marginBottom: '10px',
                                }}>Contact</Typography>
                                <TextField
                                    name='contact'
                                    size="small"
                                    sx={{
                                        width: '90%'
                                    }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.contact}
                                />
                                <Typography
                                    sx={{
                                        color: 'red'
                                    }}
                                >
                                    {
                                        formik.errors.contact && formik.touched.contact && formik.errors.contact
                                    }
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '30px'
                                }}>
                                    <Typography>Status</Typography>
                                    <Box sx={{
                                        marginLeft: '100px'
                                    }}>
                                        <RadioGroup>
                                            <Box sx={{ display: 'flex' }}>
                                                <FormControlLabel value="active" control={<Radio />} label="Active" />
                                                <FormControlLabel value="disable" control={<Radio />} label="Disabled" />
                                            </Box>
                                        </RadioGroup>

                                    </Box>


                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Typography>Verify Email</Typography>
                                    <Box sx={{
                                        marginLeft: '62px'
                                    }}>
                                        <RadioGroup>
                                            <Box sx={{ display: 'flex' }}>
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" sx={{
                                                    marginLeft: '6px'
                                                }} control={<Radio />} label="No" />
                                            </Box>
                                        </RadioGroup>

                                    </Box>



                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Typography>Verify Contact</Typography>
                                    <Box sx={{
                                        marginLeft: '46px'
                                    }}>
                                        <RadioGroup>
                                            <Box sx={{ display: 'flex' }}>
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" sx={{
                                                    marginLeft: '6px'
                                                }} control={<Radio />} label="No" />

                                            </Box>
                                        </RadioGroup>

                                    </Box>


                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AdminLayout>
    )
}
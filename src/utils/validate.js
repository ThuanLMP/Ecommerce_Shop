import * as Yup from 'yup';
import { regexPhoneNumber } from './ultils';

export const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required !'),
    password: Yup.string()
        .min(4, 'Password too short! ')
        .max(50, 'Password soo long! ')
        .required('Password required !'),
})

export const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Password too short! ')
        .max(50, 'Password soo long! ')
        .required('Password required !'),
    email: Yup.string().email('Invalid email').required('Email required !'),
    password: Yup.string()
        .min(4, 'Password too short! ')
        .max(50, 'Password soo long! ')
        .required('Password required !'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required !')
})

export const ReviewSchema = Yup.object().shape({
    content: Yup.string().max(100, 'Content soo long')
})

export const shippingInfoSchema = Yup.object().shape({
    address: Yup.string()
        .min(5, 'Address too short')
        .max(50, 'Address soo long! ')
        .required('Address required !'),
    contact: Yup.string()
        .matches(regexPhoneNumber, "That doesn't look like a phone number")
        .required('Phone is required'),
})

export const addProductSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Name too short')
        .max(20, 'Name soo long !')
        .required('Name required !'),
    description: Yup.string()
        .min(10, 'Description is too short')
        .max(100, 'Description is soo long!')
        .required('Description is required'),
    price: Yup.number()
        .typeError('Price must be number')
        .min(1, 'Price must to > 0')
        .required('Price is required'),
    brand: Yup.string()
        .max(50, 'Brand is soo long'),
    stockQuantity: Yup.number()
        .typeError('Stock Quantity must be number')
        .min(0, 'Stock quantity must to >= 0')
})
export const inputUser = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Name too short')
        .max(20, 'Name soo long !')
        .required('Name required !'),
    email: Yup.string().email('Invalid email').required('Email required !'),
    password: Yup.string()
        .min(4, 'Password too short! ')
        .max(50, 'Password soo long! ')
        .required('Password required !'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    contact: Yup.string()
        .matches(regexPhoneNumber, "That doesn't look like a phone number")
        .required('Phone is required'),
})
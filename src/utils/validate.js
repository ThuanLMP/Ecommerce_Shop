import * as Yup from 'yup';

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
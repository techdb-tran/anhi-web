import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import { loginFormSchema } from '../../../constants/formLoginSchema';
import { useDispatch, useSelector } from 'react-redux'
import { actReLogin, fetchLogin } from '../../../redux/feature/users/usersSlice';
import { useEffect } from 'react';

const initialFormValue = {
  username: '',
  password: ''
}

const LoginPage = () => {
  const navigate = useNavigate()
  const { isLoading, isLogged, accessToken } = useSelector(state => state.users)
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(loginFormSchema)
  })
  const dispatch = useDispatch()
  const { control, handleSubmit, formState: { errors } } = methods

  useEffect(() => {
    if (accessToken) {
      dispatch(actReLogin(accessToken))
    }
  }, [])

  useEffect(() => {
    if (isLogged) {
      navigate('/')
    }
  }, [isLogged, navigate])

  const onValid = (values) => {
    const payload = {
      email: values.username,
      password: values.password
    }
    dispatch(fetchLogin(payload))
  }

  return (
    <div className='login-wrapper'>
      <form onSubmit={handleSubmit(onValid)} className='login-form'>
        <label>Username: </label>
        <Controller
          name='username'
          control={control}
          render={({ field: { value, onChange } }) => (
            <input
              value={value}
              onChange={onChange}
              type={"text"}
              placeholder="username"
            />
          )}
        />
        {!!errors.username && <span className='error-message'>
          {errors.username.message}
        </span>}
        <label>Password: </label>
        <Controller
          name='password'
          control={control}
          render={({ field: { value, onChange } }) => (
            <input
              value={value}
              onChange={onChange}
              type={"password"}
              placeholder="Password"
            />
          )}
        />
        {!!errors.password && <span className='error-message'>
          {errors.password.message}
        </span>}
        <button type='submit' disabled={isLoading}>Submit</button>
        <div className='login-form__link'>
          <Link to='/login-layout/register'>You don't have account?</Link>
        </div>
      </form>

    </div >
  )
}

export default LoginPage

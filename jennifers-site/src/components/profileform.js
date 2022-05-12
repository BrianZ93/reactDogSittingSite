import React from 'react';
import { useForm } from 'react-hook-form';
import { chooseName, chooseEmail, chooseAddress, choosePhone } from '../../redux/slices/RootSlice';
import { Input } from '../sharedComponents/Input';
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';

 
export const ProfileForm = () => {

    const {register, handleSubmit} = useForm({ })

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Contact Name</label>
                    <Input {...register('name')} name="name" placeholder="Name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input {...register('email')} name="email" placeholder="Email" />
                </div>
                <div>
                    <label htmlFor="phone_number">Phone Number</label>
                    <Input {...register('phone_number')} name="phone_number" placeholder="Phone Number" />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <Input {...register('address')} name="address" placeholder="Addres" />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}
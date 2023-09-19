import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {ProfileState, setProfile} from "../../features/profile/profileSlice";

const Main: FC = () => {
    // Состояние-пример
    const profile = useAppSelector<ProfileState>(state => state.profile)
    const dispatch = useAppDispatch()

    // Пример обработки сайд-эффектов
    useEffect(() => {

        const newProfile = {
            name: "Dima",
            age: 25
        }
        dispatch(setProfile(newProfile))

    }, [])

    useEffect(() => {
        console.log(profile)
    }, [profile])

    return (
        <div>
            This is main page.
        </div>
    );
};

export default Main;
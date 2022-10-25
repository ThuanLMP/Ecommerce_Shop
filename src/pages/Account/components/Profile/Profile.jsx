import { Avatar, Button } from '@mui/material'
import { useState } from 'react'
import EditProfile from '../EditProfile'
import styles from './Profile.module.scss'

export default function Profile({ profile }) {
    const [stateEdit, setStateEdit] = useState(false)

    return (

        <div className={styles.wrapProfile}>
            {
                stateEdit === false ? <>

                    <div className={styles.wrapAvatar}>
                        <Avatar alt={profile.name} src={profile.avatar ?? 'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg'}
                            sx={{
                                height: '128px',
                                width: '128px',
                                margin: '33px'
                            }}
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <h2>{profile.username}</h2>
                        <div> <label>Email: </label>{profile.email}</div>
                        <div><label>Address: </label>test 115302, Hanoi</div>
                        <div><label>Phone: </label>{profile.contact ?? 'none'}</div>
                        <Button sx={{
                            backgroundColor: '#FFD333',
                            color: 'black',
                            fontWeight: '700',
                            marginTop: '28px'
                        }}
                        onClick={() => {
                            setStateEdit(true)
                        }}
                        >
                            Edit Profile
                        </Button>
                    </div></> :
                    <>
                        <EditProfile/>
                    </>
            }


        </div>
    )
}
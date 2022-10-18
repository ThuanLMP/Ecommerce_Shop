import styles from './ReviewProducts.module.scss'
import { Avatar, Divider, Pagination, Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const formatDate = (rawDate) => {
    const date = new Date(rawDate)
    const result = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    return result
}
export default function ReviewProducts() {

    const reviews = useSelector(state => state.products.reviews)
    const [titleStatus, setTitleStatus] = useState('Reviews')


    return (
        <div className={styles.reviewProduct}>
            <div className={styles.titleReview}>
                <div className={styles.listTitle}>
                    <ul>
                        <li className={titleStatus === 'Description' ? styles.active : ''} onClick={() => {
                            setTitleStatus('Description')
                        }}>Description</li>
                        <li className={titleStatus === 'Specification' ? styles.active : ''} onClick={() => {
                            setTitleStatus('Specification')
                        }}>Specification</li>
                        <li className={titleStatus === 'Reviews' ? styles.active : ''} onClick={() => {
                            setTitleStatus('Reviews')
                        }}>Reviews</li>
                    </ul>
                </div>

            </div>
            <Divider
                sx={{
                    borderRightWidth: 2,
                    backgroundColor: '#737070',
                    marginBottom: '19px',
                    width: '80%',
                    marginLeft: '10%',
                    marginTop: '-19px'
                }}
            />
            {
                titleStatus === 'Reviews' ? (
                    <div className={styles.contentReviews}>
                        <h2>Customer Reviews</h2>
                        {
                            reviews.total > 0 ?
                                reviews.result.map((review, index) => {
                                    return (
                                        <>
                                            <div className={styles.review}>
                                                <div className={styles.avatar}>
                                                    <Avatar />
                                                </div>
                                                <div className={styles.contentReview}>
                                                    <h3>{review.userReview.username}</h3>
                                                    <Rating name="read-only" value={review.rating} readOnly size='small' />
                                                    <p>
                                                        {
                                                            review.content
                                                        }
                                                    </p>
                                                    <p className={styles.date}>{formatDate(review.createdAt)}</p>
                                                </div>
                                            </div>
                                            <Divider
                                                sx={{
                                                    borderRightWidth: 2,
                                                    backgroundColor: '#737070',
                                                    marginBottom: '19px',
                                                    width: '73%',
                                                    marginLeft: '4%',
                                                    marginTop: '-10px'
                                                }}
                                            />
                                        </>
                                    )
                                }) : <p className={styles.titleReview}>None Review</p>
                        }



                        {
                            reviews.total > 0 ? (
                                <div className={styles.pagination}>
                                    <Pagination
                                        count={reviews.total}
                                        variant="outlined"
                                        shape="rounded"
                                        defaultPage={1}
                                        sx={{
                                            button: {
                                                backgroundColor: '#DFE3E8'
                                            },
                                            ul: {
                                                '& .MuiPaginationItem-root': {
                                                    '&.Mui-selected': {
                                                        background: '#FFD333',
                                                        color: 'black',
                                                    },
                                                },
                                            },
                                        }}

                                    />
                                </div>
                            ) : ''
                        }

                    </div>
                ) : (
                    <p className={styles.titleReview}>None</p>
                )
            }

        </div>
    )
}
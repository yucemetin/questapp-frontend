import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function CommentForm(props) {

    const [text, setText] = useState()
    const [openAlert, setOpenAlert] = useState(false);
    const { refreshComments, postId } = props

    const handleSubmit = () => {
        axios.post('http://localhost:8080/api/v1/comments', {
            userId: 1,
            postId: postId,
            text: text
        })
            .then(function (response) {
                console.log(response);
                refreshComments()
                setText("")
                setOpenAlert(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleAlert = () => {
        setOpenAlert(false);
    };

    return (
        <div className='w-full'>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={openAlert} autoHideDuration={2000} onClose={handleAlert}>
                <MuiAlert onClose={handleAlert} elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Comment sended!
                </MuiAlert>
            </Snackbar>
            <div className='w-full bg-white rounded-md p-5 flex flex-col gap-4'>
                <div className='flex gap-4'>
                    <div className='flex items-center justify-center'>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            M
                        </Avatar>
                    </div>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        inputProps={{ maxLength: 250 }}
                        fullWidth
                    />
                </div>

                <div className='flex justify-end'>
                    <button onClick={handleSubmit} className='bg-red-300 px-4 py-2 rounded-xl text-white font-bold hover:bg-red-400 transition-colors'>Comment</button>
                </div>

            </div>
        </div>
    )
}

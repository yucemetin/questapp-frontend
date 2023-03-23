import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function PostForm(props) {
    const { refreshPost } = props
    const [title, setTitle] = useState()
    const [text, setText] = useState()
    const [openAlert, setOpenAlert] = useState(false);
    const config = {
        headers: { Authorization: localStorage.getItem("tokenKey") }
    };


    const handleSubmit = () => {
        axios.post('http://localhost:8080/api/v1/posts', {
            userId: localStorage.getItem("currentUser"),
            title: title,
            text: text
        }, config)
            .then(function (response) {
                console.log(response)
                refreshPost()
                setText("")
                setTitle("")
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
        <div className='w-3/4'>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={openAlert} autoHideDuration={2000} onClose={handleAlert}>
                <MuiAlert onClose={handleAlert} elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Post sended!
                </MuiAlert>
            </Snackbar>
            <div className='w-full bg-white rounded-md shadow-lg p-5 flex flex-col gap-4'>
                <div className='flex gap-4'>
                    <div className='flex items-center justify-center'>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {localStorage.getItem("userName")?.charAt(0)?.toUpperCase() ?? "U"}
                        </Avatar>
                    </div>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                    />
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
                <div className='flex justify-end'>
                    <button onClick={handleSubmit} className='bg-red-300 px-4 py-2 rounded-xl text-white font-bold hover:bg-red-400 transition-colors'>Post</button>
                </div>
            </div>
        </div>

    )
}

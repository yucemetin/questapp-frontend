import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function PostForm(props) {
    const { post, refreshPost } = props
    const [title, setTitle] = useState()
    const [text, setText] = useState()
    const [openAlert, setOpenAlert] = useState(false);


    const handleSubmit = () => {
        axios.post('http://localhost:8080/api/v1/posts', {
            userId: 1,
            title: title,
            text: text
        })
            .then(function (response) {
                console.log(response);
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
                    This is a success message!
                </MuiAlert>
            </Snackbar>
            <Card className="w-full">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            M
                        </Avatar>
                    }
                    title={
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                        />

                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                        />
                    </Typography>
                </CardContent>
                <CardActions className="flex justify-end">
                    <button onClick={handleSubmit} className='bg-red-300 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-400 transition-colors'>Post</button>
                </CardActions>
            </Card>
        </div>

    )
}

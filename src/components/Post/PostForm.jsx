import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useState } from 'react';

export default function PostForm(props) {
    //const { post } = props
    const [title, setTitle] = useState()
    const [text, setText] = useState()


    const handleSubmit = () => {
        alert(JSON.stringify({ title, text }))
    }

    return (
        <Card className="w-3/4">
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
    )
}

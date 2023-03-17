import { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { NavLink } from "react-router-dom"

export default function Post(props) {

    const { post } = props
    const [like, setLike] = useState(false)
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = () => {
        setLike(!like)
    };

    return (
        <Card className="w-3/4">
            <CardHeader
                avatar={
                    <NavLink to={`/users/${post.userId}`}>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {post?.userName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                    </NavLink>
                }
                title={
                    <h2 className="font-extrabold text-lg">
                        {post?.title?.toUpperCase()}
                    </h2>
                }
                subheader={
                    <p className="text-green-700">
                        {post?.createdOn.slice(0, 16).replace("T", " ")}
                    </p>
                }
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post?.text}
                </Typography>
            </CardContent>
            <CardActions className="flex justify-between">
                <IconButton onClick={handleLike} aria-label="add to favorites">
                    <FavoriteIcon className={like ? `text-red-500` : ``} />
                </IconButton>
                <IconButton onClick={handleExpandClick}>
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

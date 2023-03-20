import { useState, useEffect } from "react";
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
import axios from "axios"
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";


export default function Post(props) {


    const userId = 1;
    const { post } = props
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([])
    const [liked, setLiked] = useState(false)
    const [likeId, setLikeId] = useState(0)

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expanded === false) {
            refreshComments();
        }

    };

    const handleLike = () => {
        if (liked) {
            axios.delete('http://localhost:8080/api/v1/likes/' + likeId)
                .then(function (response) {
                    setLiked(false)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios.post('http://localhost:8080/api/v1/likes', {
                postId: post.id,
                userId: userId
            })
                .then(function (response) {
                    setLiked(true)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };

    const refreshComments = () => {
        axios.get(`http://localhost:8080/api/v1/comments?postId=${post.id}`)
            .then(response => {
                setComments(response);
            })
            .catch(err => {
            })

    }

    useEffect(() => {
        post.postLikes.forEach(like => {
            if (like.userId === userId) {
                setLiked(true)
                setLikeId(like.id)
            } else {
                setLiked(false)
            }
        })
    }, [post])

    useEffect(() => {
        refreshComments();
        // eslint-disable-next-line
    }, [expanded])


    return (
        <Card className="w-3/4">
            <CardHeader
                avatar={
                    <NavLink to={`/users/${post.userId}`}>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" alt={post.userName}>
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
                <div className="flex">
                    <IconButton onClick={handleLike} aria-label="add to favorites">
                        <FavoriteIcon className={liked ? `text-red-500` : ``} />
                    </IconButton>
                    <div className="flex justify-center items-center">
                        <p className="font-bold">{post.postLikes.length}</p>
                    </div>
                </div>
                <IconButton onClick={handleExpandClick}>
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit >
                <div className="flex flex-col border-t-2">
                    {comments?.data?.map(comment => (
                        <Comment key={comment.id} userId={comment.userId} userName={comment.userName} text={comment.text} />
                    ))}
                </div>
                <CommentForm refreshComments={refreshComments} postId={post.id} />
            </Collapse>
        </Card>
    )
}



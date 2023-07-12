import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
} from "@material-ui/core";

interface PostProps {
    img: string;
    title: string;
    paragraph: string;
}

const useStyles = makeStyles((theme:any) => ({
    card: {
        marginBottom: theme.spacing(5),
    },
    media: {
        height: 250,
        [theme.breakpoints.down("sm")]: {
            height: 150,
        },
    },
}));

const Post: React.FC<PostProps> = ({ img, title,paragraph}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={img} title="My Post" />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {paragraph}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Know More
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;
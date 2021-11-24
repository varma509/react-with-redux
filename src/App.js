import React, { useState, useEffect } from 'react';
import './App.css';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { useSelector, useDispatch } from "react-redux";
import * as types from "./redux/actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));
const gridStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
const cardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    padding: '56.25%',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }
    )
  }
}));

function App() {
  const classes = useStyles();
  const gridClasses = gridStyle();
  const cardClasses = cardStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [expanded, setExpanded] = useState(false);
  const [cardValue, setCardValue] = useState("")
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.data);
  console.log("recipes", recipes)
  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  };
  const handleExpandClick = (index) => {
    setExpanded(!expanded);
    setCardValue(index);
  };

  useEffect(() => {
    dispatch({ type: types.FETCH_RECIPIE_START, payload: query });

  }, [query]);

  return (
    <div className="App">
      <h1>Recipe APP</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" variant="outlined"
          type="text"
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" color="primary" style={
          {
            width: "80px",
            height: "50px",
          }
        }
          onClick={updateSearch}>
          Search
        </Button>
      </form>
      <Grid container className={gridClasses.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {recipes && recipes.hits && recipes.hits.map((item, index) => (
              <Grid key={index} item>
                <Card className={cardClasses.root}>
                  <CardHeader
                    avatar={
                      <Avatar className={cardClasses.avatar} aria-label="recipe">
                        V
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                      </IconButton>
                    }
                    title={item.recipe.label}
                    subheader={
                      <span>
                        <DirectionsRunIcon />
                        {
                          item.calories
                        }
                      </span>
                    }
                  />
                  <CardMedia
                    component="img"
                    height={cardClasses.media}
                    image={item.recipe.image}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      className={clsx(cardClasses.expand, {
                        [cardClasses.expandOpen]: expanded,
                      })}
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={index == cardValue && expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Ingredients</Typography>
                      <Typography paragraph>
                        {
                          item.recipe.ingredients.map(value => (
                            <Typography paragraph>
                              {value.text}
                            </Typography>
                          )
                          )
                        }
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useState } from 'react';
import './ReviewForm.css'

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
    size: "large"
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function StyledRatingContainer({setState}) {
  return <StyledRating
          name="highlight-selected-only"
          defaultValue={5}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          onChange={(event, newValue) => {
            setState(newValue)
          }}
          highlightSelectedOnly
          size="large"
          />
}



export default function ReviewForm({sessionUser, trip, listing}) {
  const [overall, setOverall] = useState(5);
  const [cleaniness, setCleaniness] = useState(5);
  const [accuracy, setAccuracy] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [arrival, setArrival] = useState(5);
  const [location, setLocation] = useState(5);
  const [content, setContent] = useState();




  return (
    <div className="review">
      <div className="review-left">
        <div className="review-ratings-1">
          <p>Overall</p>
          <StyledRatingContainer setState={setOverall}/>
        </div>
        <div className="review-ratings-2">
          <p>Cleaniess</p>
          <StyledRatingContainer setState={setCleaniness} />
        </div>
        <div className="review-ratings-3">
          <p>Accuracy</p>
          <StyledRatingContainer setState={setAccuracy} />
        </div>
        <div className="review-ratings-4">
          <p>Communication</p>
          <StyledRatingContainer setState={setCommunication} />
        </div>
        <div className="review-ratings-5">
          <p>Arrival</p>
          <StyledRatingContainer setState={setArrival} />
        </div>
        <div className="review-ratings-6">
          <p>Location</p>
          <StyledRatingContainer setState={setLocation} />
        </div>
      </div>

      <div className="review-right">
        <div className="review-right-message">How do you like this trip?</div>
        <textarea className="review-right-textarea" rows="10" cols="50" onChange={(e) => setContent(e.target.value)}></textarea>
        <div className='review-button cursor'>Submit Review</div>
      </div>
    </div>
  )
}

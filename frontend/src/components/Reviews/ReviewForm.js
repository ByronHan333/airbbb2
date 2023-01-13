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
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/review'

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
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(reviewActions.createReview({
      user_id: sessionUser.id,
      trip_id: trip.id,
      listing_id: listing.id,
      overall,
      cleaniness,
      accuracy,
      communication,
      location,
      arrival,
      content
    }))
    history.push(`/listings/${listing.id}`)
  }

  return (
    <form className="review" onSubmit={handleSubmit}>
      <div className="review-left">
        <div className="review-ratings-1">
          <p className='medium'>Overall</p>
          <StyledRatingContainer setState={setOverall}/>
        </div>
        <div className="review-ratings-2">
          <p className='medium'>Cleaniess</p>
          <StyledRatingContainer setState={setCleaniness} />
        </div>
        <div className="review-ratings-3">
          <p className='medium'>Accuracy</p>
          <StyledRatingContainer setState={setAccuracy} />
        </div>
        <div className="review-ratings-4">
          <p className='medium'>Communication</p>
          <StyledRatingContainer setState={setCommunication} />
        </div>
        <div className="review-ratings-5">
          <p className='medium'>Arrival</p>
          <StyledRatingContainer setState={setArrival} />
        </div>
        <div className="review-ratings-6">
          <p className='medium'>Location</p>
          <StyledRatingContainer setState={setLocation} />
        </div>
      </div>

      <div className="review-right">
        <div className="review-right-message medium">How do you like this place?</div>
        <textarea className="review-right-textarea" rows="10" cols="50" onChange={(e) => setContent(e.target.value)}></textarea>
        <input type="submit" className='review-button cursor' value="Submit Review"></input>
      </div>
    </form>
  )
}

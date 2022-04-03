import HeartLogo from '../assets/heart.svg';

const Heart = (props) => {
    const message = props.msg;
    return (
      <div className="heart">
        <img className="heart-img" src={HeartLogo} alt="heart" />
        <p className="heart-message">{message}</p>
      </div>
    )
}

export default Heart;
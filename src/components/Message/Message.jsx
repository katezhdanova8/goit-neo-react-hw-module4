import css from './Message.module.css';

const Message = ({ text }) => {
  return (
    <div className={css.Message}>
      {text}
    </div>);
}

export default Message;
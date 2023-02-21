import React, { useState } from 'react';
import Typography from 'components/ui/Typography';
import IconButton from 'components/ui/IconButton';
import { ReactComponent as BasketIcon } from 'assets/icons/basket.svg';
import { ReactComponent as ThumbUpBorderIcon } from 'assets/icons/thumb-up-border.svg';
import { ReactComponent as ThumbUpIcon } from 'assets/icons/thumb-up.svg';
import { ReactComponent as ThumbDownBorderIcon } from 'assets/icons/thumb-down-border.svg';
import { ReactComponent as ThumbDownIcon } from 'assets/icons/thumb-down.svg';
import styles from './styles.module.scss';

const Comment = ({
  user,
  date,
  description,
  positiveText,
  negativeText,
  isLiked: initIsLiked,
  isDisliked: initIsDisliked,
}) => {
  const [isLiked, setIsLiked] = useState(initIsLiked);
  const [isDisliked, setIsDisliked] = useState(initIsDisliked);

  const likedHandler = () => {
    setIsLiked((prev) => !prev);
  };

  const dislikedHandler = () => {
    setIsDisliked((prev) => !prev);
  };
  return (
    <li className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <div className={styles.userBlock}>
          <BasketIcon width={24} fill='green' />
          <Typography variant='h6'>{user}</Typography>
        </div>
        <Typography variant='body2' className={styles.commentDate}>
          {date}
        </Typography>
      </div>
      <div className={styles.commentContent}>
        <Typography>{description}</Typography>
        <Typography>Positive:</Typography>
        <Typography>{positiveText}</Typography>
        <Typography>Negative:</Typography>
        <Typography>{negativeText}</Typography>
      </div>
      <div className={styles.commentFooter}>
        <IconButton onClick={likedHandler}>
          {isLiked ? <ThumbUpIcon width={20} /> : <ThumbUpBorderIcon width={20} />}
        </IconButton>
        <IconButton onClick={dislikedHandler}>
          {isDisliked ? <ThumbDownIcon width={20} /> : <ThumbDownBorderIcon width={20} />}
        </IconButton>
      </div>
    </li>
  );
};

export default Comment;

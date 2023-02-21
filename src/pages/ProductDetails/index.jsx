import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Typography from 'components/ui/Typography';
import Skeleton from 'components/ui/Skeleton';
import Button from 'components/ui/Button';
import IconButton from 'components/ui/IconButton';
import Tabs from 'components/ui/Tabs';
import Tab from 'components/ui/Tab';
import { productData as initProductData } from './utils';
import services from 'api/services';
import { ReactComponent as CartIcon } from 'assets/icons/cart2.svg';
import { ReactComponent as FavoriteBorderIcon } from 'assets/icons/favorite-border.svg';
import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';
import TabPanel from 'components/ui/TabPanel';
import Comment from 'components/Comment';
import styles from './styles.module.scss';

const x = {
  user: 'test user',
  date: '2022-01-01',
  description: 'rewfrwe fre f er fer f er f re f er fer  fer f er ',
  positiveText: 'r fre f re fre f ',
  negativeText: 'ff f erf er fre f er fe',
};

const arr = [x, x, x];

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const [isProductLoading, setIsProductLoading] = useState(initProductData);
  const [tab, setTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const mounted = useRef(false);
  let { productId } = useParams();

  useEffect(() => {
    const getProductData = async () => {
      try {
        setIsProductLoading(true);
        const { data } = await services.get(`/products/${productId}`);

        if (data) {
          const resData = data;
          setProductData(resData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsProductLoading(false);
      }
    };

    if (mounted.current) {
      getProductData();
    }

    mounted.current = true;
  }, [productId]);

  const onChangeTab = (value) => {
    setTab(value);
  };

  const onFavoriteHandler = (prev) => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.imgContainer}>
        {isProductLoading ? (
          <Skeleton variant='rounded' style={{ width: '100%', height: '100%' }} />
        ) : (
          <div className={styles.productDetailsImgContainer}>
            <img src={productData.image} alt='Product' />
          </div>
        )}
      </div>

      <div className={styles.productDetailsContent}>
        <Typography variant='h4' component='h1' className={styles.productDetailsTitle}>
          {isProductLoading ? <Skeleton style={{ width: '100%' }} /> : <>{productData.name}</>}
        </Typography>

        <div className={styles.productDetailsPriceBlock}>
          <Typography variant='body1' className={styles.productDetailsPrice}>
            {isProductLoading ? <Skeleton style={{ width: '80px' }} /> : <>{productData.price}$</>}
          </Typography>

          <Button className={styles.toastCloseBtn} startIcon={CartIcon} onClick={() => {}}>
            Buy
          </Button>

          {isFavorite ? (
            <IconButton onClick={onFavoriteHandler}>
              <FavoriteIcon width={24} fill='#ffa900' />
            </IconButton>
          ) : (
            <IconButton onClick={onFavoriteHandler}>
              <FavoriteBorderIcon width={24} fill='#ffa900' />
            </IconButton>
          )}
        </div>

        <Tabs value={tab} onChange={onChangeTab}>
          <Tab label='Description' value={0} current={tab} />
          <Tab label='Feedback' value={1} current={tab} />
        </Tabs>

        <TabPanel value={tab} index={0}>
          {isProductLoading ? (
            <>
              <Skeleton style={{ width: '100%', marginBottom: '4px' }} />
              <Skeleton style={{ width: '100%', marginBottom: '4px' }} />
              <Skeleton style={{ width: '80%', marginBottom: '4px' }} />
            </>
          ) : (
            <Typography variant='body1' className='product-details-description'>
              {productData.description}
            </Typography>
          )}
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <ul className={styles.commentList}>
            {arr.map((item) => {
              return <Comment {...item} />;
            })}
          </ul>
        </TabPanel>

        {/* <p>
          4.4 <span>22</span>
        </p> */}
      </div>
    </div>
  );
};

export default ProductDetails;

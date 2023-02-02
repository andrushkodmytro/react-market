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
import './styles.scss';

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const [isProductLoading, setIsProductLoading] = useState(initProductData);
  const [tab, setTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const mounted = useRef(false);
  let { productId } = useParams();

  console.log(productData);
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
    <div className='product-details'>
      <div className='img-container'>
        {isProductLoading ? (
          <Skeleton variant='rounded' style={{ width: '100%', height: '100%' }} />
        ) : (
          <div className='product-details-img-container'>
            <img src={productData.image} alt='Product' />
          </div>
        )}
      </div>

      <div className='product-details-content'>
        <Typography variant='h4' component='h1' className='product-details-title'>
          {isProductLoading ? <Skeleton style={{ width: '100%' }} /> : <>{productData.name}</>}
        </Typography>

        <div className='product-details-price-block'>
          <Typography variant='body1' className='product-details-price'>
            {isProductLoading ? <Skeleton style={{ width: '80px' }} /> : <>{productData.price}$</>}
          </Typography>

          <Button className={'toast-close-btn'} startIcon={CartIcon} onClick={() => {}}>
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
          Tab 2
        </TabPanel>

        {/* <p>
          4.4 <span>22</span>
        </p> */}
      </div>
    </div>
  );
};

export default ProductDetails;

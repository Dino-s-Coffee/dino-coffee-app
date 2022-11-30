import {
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonCard,
    IonToolbar,
    IonButton,
    IonIcon,
    IonCol,
    IonGrid,
    IonRow
} from '@ionic/react';
import { heart as heartFill, heartOutline } from 'ionicons/icons';
import { toggleProduct, selectFavorite, checkFavorite } from '../features/favorite/favoriteSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

interface ProductItemProps {
    product: Product
}

const ProductCard: React.FC<ProductItemProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const favorite = useAppSelector(selectFavorite);
    const isFavorite = checkFavorite(favorite.products, product.id);

    function toggleFavorite(e: any) {
        e.stopPropagation();
        e.preventDefault();
        dispatch(toggleProduct(product));
    }

    return (
        <IonCard button routerLink={`/product/detail/${product.id}`} color='light' >
            <IonGrid>
                <IonRow>
                    <IonCol size="4">
                        <img src={product.image} alt={product.name} />
                    </IonCol>
                    <IonCol size="8">
                        <IonCardHeader>
                            <IonCardTitle>{product.name}</IonCardTitle>
                            <IonCardSubtitle>{product.price}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonToolbar color='light'>
                                <IonIcon color='primary' size='large' onClick={toggleFavorite} slot="end" icon={isFavorite ? heartFill : heartOutline} />
                            </IonToolbar>
                        </IonCardContent>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonCard>
    );
};

export default ProductCard;
